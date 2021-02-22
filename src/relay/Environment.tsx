import {
  Environment,
  Network,
  RecordSource,
  Store,
  Observable,
} from "relay-runtime";
import { SubscriptionClient } from "subscriptions-transport-ws";

const subscriptionClient = new SubscriptionClient(
  "wss://draftcard.hasura.app/v1beta1/relay",
  {
    reconnect: true,
  }
);

const subscribe = (request: any, variables: any) => {
  const subscribeObservable = subscriptionClient.request({
    query: request.text,
    operationName: request.name,
    variables,
  });
  // Important: Convert subscriptions-transport-ws observable type to Relay's
  return Observable.from(subscribeObservable as any);
};

export function fetchQuery(operation: any, variables: any) {
  return fetch("https://draftcard.hasura.app/v1beta1/relay", {
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
  network: Network.create(fetchQuery, subscribe),
  store: new Store(new RecordSource()),
});
