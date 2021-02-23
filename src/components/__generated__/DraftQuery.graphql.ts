/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type DraftQueryVariables = {
    draftID: number;
};
export type DraftQueryResponse = {
    readonly teams_connection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly logo: string;
                readonly name: string;
                readonly team_id: number;
                readonly id: string;
            };
        }>;
    };
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
export type DraftQuery = {
    readonly response: DraftQueryResponse;
    readonly variables: DraftQueryVariables;
};



/*
query DraftQuery(
  $draftID: Int!
) {
  teams_connection {
    edges {
      node {
        logo
        name
        team_id
        id
      }
    }
  }
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
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "teamsConnection",
    "kind": "LinkedField",
    "name": "teams_connection",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "teamsEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "teams",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "logo",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "team_id",
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  },
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
              (v1/*: any*/),
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
    "name": "DraftQuery",
    "selections": (v2/*: any*/),
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DraftQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "75b0fbbfb8d70d0ec5760aa6fcb6c311",
    "id": null,
    "metadata": {},
    "name": "DraftQuery",
    "operationKind": "query",
    "text": "query DraftQuery(\n  $draftID: Int!\n) {\n  teams_connection {\n    edges {\n      node {\n        logo\n        name\n        team_id\n        id\n      }\n    }\n  }\n  drafts_connection(where: {id: {_eq: $draftID}}) {\n    edges {\n      node {\n        draft_order\n        id\n        interval\n        picks\n        rounds\n        start\n        picks_timestamps\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'ca86e389fc2cc4b26180753978dd6df6';
export default node;
