/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type DraftQueryVariables = {||};
export type DraftQueryResponse = {|
  +teams: $ReadOnlyArray<{|
    +team_id: number,
    +name: string,
    +logo: string,
  |}>
|};
export type DraftQuery = {|
  variables: DraftQueryVariables,
  response: DraftQueryResponse,
|};
*/


/*
query DraftQuery {
  teams {
    team_id
    name
    logo
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "teams",
    "kind": "LinkedField",
    "name": "teams",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "team_id",
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
        "name": "logo",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "DraftQuery",
    "selections": (v0/*: any*/),
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "DraftQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "661fe3f78e41409a19d50b6c2e64a8ed",
    "id": null,
    "metadata": {},
    "name": "DraftQuery",
    "operationKind": "query",
    "text": "query DraftQuery {\n  teams {\n    team_id\n    name\n    logo\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '6a33728e9207762b1ba2bb9817d1de42';

module.exports = node;
