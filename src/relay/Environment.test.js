import { fetchQuery } from "./Environment"

const operation = {
    text: `query DraftQuery($teamID: Int!) {
        teams_connection(where: {team_id: {_eq: $teamID}}) {
          edges {
            node {
              team_id
            }
          }
        }
      }`
}

const result = {
    "data": {
        "teams_connection": {
            "edges": [{
                "node": {
                    "team_id": 1
                }
            }]
        }
    }
};

test('Relay networking working', async () => {
    expect.assertions(1);
    const response = await fetchQuery(operation, { "teamID": 1 });
    expect(response).toEqual(result)
})