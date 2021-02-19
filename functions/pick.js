const graphql = require('./graphql')

const DraftQuery = `query DraftQuery($draftID: Int!) {
  drafts_by_pk(id:$draftID) {
    id
    start
    draft_order
    interval
    rounds
    picks
  }
  teams{
    name
  }
}`;

const DraftMutation = `
mutation DraftMutation($draftID: Int!, $picks: jsonb ) {
  update_drafts_by_pk (
    pk_columns: {id: $draftID}
    _set: { picks: $picks }
  ) {
    id
    picks
  }
}
`;

function validatePOST(event) {
  if (typeof event !== 'object') {
    return false;
  }
  if (!event.hasOwnProperty('body')) {
    return false;
  }
  if (typeof event.body !== 'object') {
    return false;
  }
  if (!event.body.hasOwnProperty('username')) {
    return false;
  }
  if (event.body.username === undefined || event.body.username.length < 3) {
    return false;
  }
  if (!event.body.hasOwnProperty('draft')) {
    return false;
  }
  if (!parseInt(event.body.draft) > 0) {
    return false;
  }
  if (!event.body.hasOwnProperty('team')) {
    return false;
  }
  if (event.body.team === undefined || event.body.team.length < 3) {
    return false;
  }
  return true;
}

function validatePayload(payload) {
  if (!payload.hasOwnProperty('data')) {
    return false;
  }
  if (!payload.data.hasOwnProperty('drafts_by_pk')) {
    return false;
  }
  if (!payload.data.drafts_by_pk.hasOwnProperty('draft_order')) {
    return false;
  }
  if (typeof payload.data.drafts_by_pk.draft_order === 'undefined') {
    return false;
  }
  // draft has players
  if (payload.data.drafts_by_pk.draft_order.length <= 0) {
    return false;
  }
  // draft has interval
  if (payload.data.drafts_by_pk.interval <= 15) {
    return false;
  }
  // draft has rounds
  if (payload.data.drafts_by_pk.rounds < 1) {
    return false;
  }
  return true;
}

function processDraft(data) {
  const draft = data.drafts_by_pk;
  draft.countPlayers = draft.draft_order.length;
  draft.countPicks = draft.picks.length;
  draft.maxPicks = draft.countPlayers * draft.rounds;
  // picks can be made early.
  draft.maxSeconds = draft.maxPicks * draft.interval;
  draft.validatedOn = Math.floor(new Date().getTime() / 1000);
  draft.teamsAvailable = data.teams.map(team => team.name);
  draft.currentPickIndex = draft.countPicks % draft.countPlayers;
  draft.currentUser = draft.draft_order[draft.currentPickIndex]
  return draft;
}

function validateDraft(draft) {
  // picks made
  if (draft.countPicks >= draft.maxPicks) {
    return false;
  }
  return true;
}

function authenticate(event, draft) {
  // is username in draft order
  if (!draft.draft_order.includes(event.body.username)) {
    return false;
  }
  // is payload team in teams
  if (!draft.teamsAvailable.includes(event.body.team)) {
    return false;
  }
  return true;
}

function authorize(event, draft) {
  if (draft.currentUser !== event.body.username) {
    return false;
  }
  if (draft.picks.includes(event.body.team)) {
    return false;
  }
  return true;
}

function processTimestamps(draft) {
  draft.timestamp = Math.round(new Date(draft.start).getTime() / 1000)
  draft.maxEnding = draft.timestamp + draft.maxSeconds;
  return draft;
}

function validateTimestamps(draft) {
  // smoke test, older than 2020
  if (draft.timestamp < 1577854800) {
    return false;
  }
  if (draft.timestamp < draft.validatedOn) {
    return false;
  }
  return true;
}

exports.handler = async function (event, context) {
  // is username post set, validate post
  if (!validatePOST(event)) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Invalid request" })
    };
  }

  const payload = await graphql.fetchQuery(DraftQuery, { draftID: String(event.body.draft) })
  if (!validatePayload(payload)) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Invalid request" })
    };
  }

  let draft = processDraft(payload.data);
  if (!validateDraft(draft)) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Invalid request" })
    };
  }

  if (!authenticate(event, draft)) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Invalid request" })
    };
  }

  if (!authorize(event, draft)) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Invalid request" })
    };
  }

  draft = processTimestamps(draft);
  if (!validateTimestamps(draft)) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Invalid request" })
    };
  }


  const mutation = await graphql.fetchQuery(DraftMutation, { draftID: parseInt(event.body.draft), picks: [...draft.picks, event.body.team] })
  return {
    statusCode: 200,
    body: JSON.stringify({ data: mutation.data.update_drafts_by_pk })
  };
}