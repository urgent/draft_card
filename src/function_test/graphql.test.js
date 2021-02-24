import { fetchQuery } from '../../functions/graphql';

test('Serverless graphql works', async () => {
  const payload = await fetchQuery(`query MyQuery {
    teams_connection {
      edges {
        node {
          name
        }
      }
    }
  }`)

  const result = [
    { "node": { "name": "Boston Celtics" } },
    { "node": { "name": "Brooklyn Nets" } },
    { "node": { "name": "New York Knicks" } },
    { "node": { "name": "Philadelphia 76ers" } },
    { "node": { "name": "Toronto Raptors" } }
  ];

  expect(payload.data.teams_connection.edges).toEqual(result);
})