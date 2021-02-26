import { handler } from '../../functions/pick';
import graphql from '../../functions/graphql'

jest.setTimeout(30000)

afterAll(() => {
    // reverse mutations from Pick works for ready to pick user
    const TestMutation = `mutation DraftMutation($draftID: Int!, $picks: jsonb ) {
        update_drafts_by_pk (
          pk_columns: {id: $draftID}
          _set: { picks: $picks }
        ) {
          id
          picks
        }
      }`
    graphql.fetchQuery(TestMutation, { draftID: 3, picks: [] })
    graphql.fetchQuery(TestMutation, { draftID: 4, picks: ["Boston Celtics"] })
});

test('Pick errors with no parameters', async () => {
    const response = await handler();
    const json = JSON.parse(response.body)
    expect(json).toEqual({ error: 'Invalid request' });
})

test('Pick errors on undefined body', async () => {
    const response = await handler({ body: undefined });
    const json = JSON.parse(response.body)
    expect(json).toEqual({ error: 'Invalid request' });
})
test('Pick errors on undefined username', async () => {
    const response = await handler({ body: { username: undefined, draft: 3, team: "Boston Celtics" } });
    const json = JSON.parse(response.body)
    expect(json).toEqual({ error: 'Invalid request' });
})

test('Pick errors on undefined draft', async () => {
    const response = await handler({ body: { username: "AAA", draft: undefined, team: "Boston Celtics" } });
    const json = JSON.parse(response.body)
    expect(json).toEqual({ error: 'Invalid request' });
})

test('Pick errors on undefined team', async () => {
    const response = await handler({ body: { username: "AAA", draft: 3, team: undefined } });
    const json = JSON.parse(response.body)
    expect(json).toEqual({ error: 'Invalid request' });
})

test('Pick errors on team not in draft', async () => {
    const response = await handler({ body: { username: "AAA", draft: 3, team: 'Buffalo Braves' } });
    const json = JSON.parse(response.body)
    expect(json).toEqual({ error: 'Invalid request' });
})

test('Pick errors on user not in draft', async () => {
    const response = await handler({ body: { username: "ZZZ", draft: 3, team: 'Boston Celtics' } });
    const json = JSON.parse(response.body)
    expect(json).toEqual({ error: 'Invalid request' });
})

test('Pick errors on expired draft', async () => {
    const response = await handler({ body: { username: "AAA", draft: 1, team: 'Boston Celtics' } });
    const json = JSON.parse(response.body)
    expect(json).toEqual({ error: 'Invalid request' });
})

test('Pick errors on draft slots exceeded', async () => {
    const response = await handler({ body: { username: "AAA", draft: 5, team: 'New York Knicks' } });
    const json = JSON.parse(response.body)
    expect(json).toEqual({ error: 'Invalid request' });
})

test('Pick errors if team is already drafted', async () => {
    const timestamp = Date.now() - ((Math.floor(Math.random() * 14) + 1) * 1000);
    await update({ draftID: 4, startOffset: 16, picks: ["Boston Celtics"], timestamps: [timestamp], users: ["AAA"] })
    const response = await handler({ body: { username: "BBB", draft: 4, team: 'Boston Celtics' } });
    const json = JSON.parse(response.body)
    expect(json).toEqual({ error: 'Invalid request' });
})

async function update({ draftID, startOffset, picks, timestamps, users }) {
    // need to update start date or pick is invalid
    const StartMutation = `mutation DraftMutation($draftID: Int!,  $start:timestamptz, $picks: jsonb, $timestamps: jsonb, $users:jsonb ) {
        update_drafts_by_pk (
        pk_columns: {id: $draftID}
        _set: { start: $start, picks:$picks, picks_timestamps: $timestamps, picks_users: $users  }
        ) {
        id
        picks
        }
    }`
    const start = (new Date(Date.now() - startOffset * 1000)).toISOString().replace('T', ' ').replace('Z', '');
    await graphql.fetchQuery(StartMutation, { draftID: draftID, timestamps: timestamps, start: start, picks: picks, users: users })
}

test('Pick errors on not current user', async () => {
    // no picks, not first user trying to select
    await update({ draftID: 3, startOffset: 5, picks: [], timestamps: [], users: [] })
    const response = await handler({ body: { username: "BBB", draft: 3, team: 'Boston Celtics' } });
    const json = JSON.parse(response.body)
    expect(json).toEqual({ error: 'Invalid request' });
    // picks, not second user trying to select
    // active user based on last timestamp
    // random value for timestamp of last pick, between interval
    const timestamp = Date.now() - ((Math.floor(Math.random() * 14) + 1) * 1000);
    await update({ draftID: 4, startOffset: 16, picks: ["Boston Celtics"], timestamps: [timestamp], users: ["AAA"] })
    const response2 = await handler({ body: { username: "AAA", draft: 4, team: 'Brooklyn Nets' } });
    const json2 = JSON.parse(response2.body)
    expect(json2).toEqual({ error: 'Invalid request' });
})

test('Pick works for ready to pick user', async () => {
    const response = await handler({ body: { username: "AAA", draft: 3, team: 'Boston Celtics' } });
    expect(response.statusCode).toEqual(200);
    // Run for draft that has picks
    const timestamp = Date.now() - ((Math.floor(Math.random() * 14) + 1) * 1000);
    await update({ draftID: 4, startOffset: 5, picks: ['Boston Celtics'], timestamps: [timestamp], users: ['AAA'] })
    const response2 = await handler({ body: { username: "BBB", draft: 4, team: 'Brooklyn Nets' } });
    expect(response2.statusCode).toEqual(200);
})

test('Pick fills missing selections with highest ranked teams', async () => {
    const timestamp = Date.now() - 16000;
    await update({ draftID: 40, startOffset: 17, picks: ['Boston Celtics'], timestamps: [timestamp], users: ['AAA'] })
    // make selection, and skipped pick should block default team
    const response = await handler({ body: { username: "CCC", draft: 40, team: 'Brooklyn Nets' } });
    expect(response.statusCode).toEqual(500);
    // make selection, and non-default team should work
    const response2 = await handler({ body: { username: "CCC", draft: 40, team: 'New York Knicks' } });
    expect(response2.statusCode).toEqual(200);
    // response should include skipped pick default selection
    const json = JSON.parse(response2.body);
    expect(json.data.picks[1]).toEqual("Brooklyn Nets");
    expect(json.data.picks_users[1]).toEqual("BBB");
})

// processDraft edge cases