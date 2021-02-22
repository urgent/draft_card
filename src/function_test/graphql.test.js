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
    { "node": { "name": "New York Knicks" } }
  ];

  expect(payload.data.teams_connection.edges).toEqual(result);
})