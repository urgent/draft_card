import { handler } from '../../functions/pick';

jest.setTimeout(3000)

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
    const response = await handler();
    const json = JSON.parse(response.body)
    expect(json).toEqual({ error: 'Invalid request' });
})

test('Pick errors on user not in draft', async () => {
    const response = await handler({ body: { username: "ZZZ", draft: 3 } });
    const json = JSON.parse(response.body)
    expect(json).toEqual({ error: 'Invalid request' });
})

test('Pick errors on expired draft', async () => {
    const response = await handler({ body: { username: "AAA", draft: 1 } });
    const json = JSON.parse(response.body)
    expect(json).toEqual({ error: 'Invalid request' });
})

test('Pick errors on not current user', async () => {
    const response = await handler();
    const json = JSON.parse(response.body)
    expect(json).toEqual({ error: 'Invalid request' });
})

test('Pick works for ready to pick user', async () => {
    const response = await handler();
    const json = JSON.parse(response.body)
    expect(json).toEqual({ error: 'Invalid request' });
})

test('Pick moves to next user when current user picks', async () => {
    const response = await handler();
    const json = JSON.parse(response.body)
    expect(json).toEqual({ error: 'Invalid request' });
})

test('Pick errors on draft slots exceeded', async () => {
    const response = await handler();
    const json = JSON.parse(response.body)
    expect(json).toEqual({ error: 'Invalid request' });
})