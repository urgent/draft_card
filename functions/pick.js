const graphql = require('./graphql')

const DraftQuery = `query DraftQuery($draftID:Int!) {
  drafts_connection(where: {id: {_eq: $draftID}}) {
    edges {
      node {
        id
        start
        draft_order
        interval
        rounds
        picks
        picks_users
        picks_timestamps
      }
    }
  }
  teams_connection(order_by: { rank: asc }) {
    edges {
      node {
        logo
        name
        team_id
        id
        rank
      }
    }
  }
}`;

const DraftMutation = `
mutation DraftMutation($draftID: Int!, $picks: jsonb, $picks_users: jsonb, $picks_timestamps:jsonb ) {
  update_drafts_by_pk (
    pk_columns: {id: $draftID}
    _set: { picks: $picks, picks_users: $picks_users, picks_timestamps: $picks_timestamps }
  ) {
    id
    picks
    picks_users
    picks_timestamps
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
  if (!payload.data.hasOwnProperty('drafts_connection')) {
    return false;
  }
  if (!payload.data.drafts_connection.edges[0].node.hasOwnProperty('draft_order')) {
    return false;
  }
  if (typeof payload.data.drafts_connection.edges[0].node.draft_order === 'undefined') {
    return false;
  }
  // draft has players
  if (payload.data.drafts_connection.edges[0].node.draft_order.length <= 0) {
    return false;
  }
  // draft has interval
  if (payload.data.drafts_connection.edges[0].node.interval < 15) {
    return false;
  }
  // draft has rounds
  if (payload.data.drafts_connection.edges[0].node.rounds < 1) {
    return false;
  }
  return true;
}

function processDraft(data) {
  const draft = data.drafts_connection.edges[0].node;
  draft.countPlayers = draft.draft_order.length;
  draft.countPicks = draft.picks.length;
  draft.maxPicks = draft.countPlayers * draft.rounds;
  // picks can be made early.
  draft.maxSeconds = draft.maxPicks * draft.interval;
  draft.validatedOn = Math.floor(Date.now() / 1000);
  draft.teamsAvailable = data.teams_connection.edges.map(edge => edge.node.name);
  draft.timestamp = Math.floor(new Date(draft.start).getTime() / 1000)
  draft.maxEnding = draft.timestamp + draft.maxSeconds;


  if (draft.picks_timestamps.length === 0) {
    draft.sinceLastPick = 0;
  } else {
    draft.sinceLastPick = draft.validatedOn - Math.floor(draft.picks_timestamps.slice(-1)[0] / 1000);
  }

  const difference = draft.validatedOn - draft.timestamp;
  draft.intervalFromStart = Math.floor(difference / draft.interval)
  draft.intervalFromLastPick = Math.floor(draft.sinceLastPick / draft.interval)

  // interval from start means nothing, users can pick early
  // get draft order of last pick
  if (draft.picks_users.length === 0) {
    draft.lastPickIndex = 0;
    draft.currentPickIndex = 0;
  } else {
    draft.lastPickIndex = draft.draft_order.indexOf(draft.picks_users.slice(-1)[0])
    draft.currentPickIndex = (draft.lastPickIndex + draft.intervalFromLastPick + 1) % draft.countPlayers;
  }
  /*
    current pick is:
    draft order of last pick
    + amount of picks skipped
    + 1 to advance
  */
  draft.currentUser = draft.draft_order[draft.currentPickIndex]

  // need to subtract 1, for this interval
  draft.skippedCount = Math.floor(draft.sinceLastPick / draft.interval)
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

function validateTimestamps(draft) {
  // smoke test, older than 2020
  if (draft.timestamp < 1577854800) {
    return false;
  }
  /* if "validatedOn", or when this request was made,
     is less than 
     "timestamp", or when this draft starts
     the draft hasn't begun yet
  */
  if (draft.validatedOn < draft.timestamp) {
    return false;
  }
  // request made later than it's possible for draft to last
  // maxEnding is max number of picks * interval
  if (draft.validatedOn > draft.maxEnding) {
    return false;
  }
  return true;
}

function processSkips(draft) {
  // get highest ranked team not drafted
  const teams = draft.teamsAvailable.filter((team) => !draft.picks.includes(team))
  if (draft.skippedCount > 0) {
    for (let i = 0; i < draft.skippedCount; i++) {
      const skipIndex = (draft.lastPickIndex + 1) % draft.countPlayers;
      const user = draft.draft_order[skipIndex]
      draft.picks = [...draft.picks, teams.shift()];
      draft.picks_timestamps = [...draft.picks_timestamps, Date.now()]
      draft.picks_users = [...draft.picks_users, user]
    }
  }
  return draft;
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

  draft = processSkips(draft)

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

  if (!validateTimestamps(draft)) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Invalid request" })
    };
  }


  const mutation = await graphql.fetchQuery(DraftMutation, { draftID: parseInt(event.body.draft), picks: [...draft.picks, event.body.team], picks_users: [...draft.picks_users, event.body.username], picks_timestamps: [...draft.picks_timestamps, Date.now()] })
  return {
    statusCode: 200,
    body: JSON.stringify({ data: mutation.data.update_drafts_by_pk })
  };
}