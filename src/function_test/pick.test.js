import { handler } from '../../netlify/functions/pick';

test('Pick blocks empty POST', async () => {
    const response = await handler();
    const json = JSON.parse(response.body)
    expect(json.data).toEqual({ result: 'error' });
})