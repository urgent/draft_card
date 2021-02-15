import { fetchQuery } from "./Environment"

const operation = {
    text: `query {
        team_by_pk(team_id:1) {
            team_id
        }
    }`
}

const result = {
    "data": {
        "team_by_pk": {
            "team_id": 1
        }
    }
};

test('Relay networking working', async () => {
    expect.assertions(1);
    const response = await fetchQuery(operation, {});
    expect(response).toEqual(result)
})