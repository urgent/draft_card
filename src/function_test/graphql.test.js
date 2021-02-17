import { fetchQuery } from '../../netlify/includes/graphql';

test('Serverless graphql works', async () => {
    const payload = await fetchQuery(`query MyQuery {
        teams {
          name
        }
      }`)
    expect(payload).toEqual({ "data": { "teams": [{ "name": "Boston Celtics" }, { "name": "Brooklyn Nets" }] } });
})