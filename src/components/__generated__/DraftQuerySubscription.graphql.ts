/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type DraftQuerySubscriptionVariables = {
    draftID: number;
};
export type DraftQuerySubscriptionResponse = {
    readonly drafts_connection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly draft_order: unknown;
                readonly id: string;
                readonly interval: number;
                readonly picks: unknown;
                readonly rounds: number;
                readonly start: unknown;
                readonly picks_timestamps: unknown | null;
            };
        }>;
    };
};
export type DraftQuerySubscription = {
    readonly response: DraftQuerySubscriptionResponse;
    readonly variables: DraftQuerySubscriptionVariables;
};



/*
subscription DraftQuerySubscription(
  $draftID: Int!
) {
  drafts_connection(where: {id: {_eq: $draftID}}) {
    edges {
      node {
        draft_order
        id
        interval
        picks
        rounds
        start
        picks_timestamps
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "draftID"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "fields": [
              {
                "kind": "Variable",
                "name": "_eq",
                "variableName": "draftID"
              }
            ],
            "kind": "ObjectValue",
            "name": "id"
          }
        ],
        "kind": "ObjectValue",
        "name": "where"
      }
    ],
    "concreteType": "draftsConnection",
    "kind": "LinkedField",
    "name": "drafts_connection",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "draftsEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "drafts",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "draft_order",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "interval",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "picks",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "rounds",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "start",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "picks_timestamps",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "DraftQuerySubscription",
    "selections": (v1/*: any*/),
    "type": "subscription_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DraftQuerySubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "5066fbc89bb819682ea3afdc2b7b1378",
    "id": null,
    "metadata": {},
    "name": "DraftQuerySubscription",
    "operationKind": "subscription",
    "text": "subscription DraftQuerySubscription(\n  $draftID: Int!\n) {\n  drafts_connection(where: {id: {_eq: $draftID}}) {\n    edges {\n      node {\n        draft_order\n        id\n        interval\n        picks\n        rounds\n        start\n        picks_timestamps\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'e0542653d926b86033babace345ea9bf';
export default node;
