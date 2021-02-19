import { handler } from '../../functions/pick';

jest.setTimeout(30000)

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

test('Pick errors on not current user', async () => {
    const response = await handler({ body: { username: "BBB", draft: 3, team: 'Boston Celtics' } });
    const json = JSON.parse(response.body)
    expect(json).toEqual({ error: 'Invalid request' });
    // Run for draft that has picks
    const response2 = await handler({ body: { username: "AAA", draft: 4, team: 'Brooklyn Nets' } });
    const json2 = JSON.parse(response2.body)
    expect(json2).toEqual({ error: 'Invalid request' });
})

test('Pick errors on draft slots exceeded', async () => {
    const response = await handler({ body: { username: "AAA", draft: 5, team: 'New York Knicks' } });
    const json = JSON.parse(response.body)
    expect(json).toEqual({ error: 'Invalid request' });
})

test('Pick errors if team is already drafted', async () => {
    const response = await handler({ body: { username: "BBB", draft: 4, team: 'Boston Celtics' } });
    const json = JSON.parse(response.body)
    expect(json).toEqual({ error: 'Invalid request' });
})

test('Pick works for ready to pick user', async () => {
    const response = await handler({ body: { username: "AAA", draft: 3, team: 'Boston Celtics' } });
    expect(response.statusCode).toEqual(200);
    // Run for draft that has picks
    const response2 = await handler({ body: { username: "BBB", draft: 4, team: 'Brooklyn Nets' } });
    expect(response2.statusCode).toEqual(200);
})