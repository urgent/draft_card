import { Environment, Network, RecordSource, Store } from "relay-runtime";

export function fetchQuery(operation: any, variables: any) {
  return fetch("https://draftcard.hasura.app/v1/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then((response) => {
    return response.json();
  });
}

export const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});
