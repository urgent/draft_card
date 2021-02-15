/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type TableQueryVariables = {||};
export type TableQueryResponse = {|
  +team: $ReadOnlyArray<{|
    +name: string,
    +logo: string,
  |}>
|};
export type TableQuery = {|
  variables: TableQueryVariables,
  response: TableQueryResponse,
|};
*/


/*
query TableQuery {
  team {
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
    "concreteType": "team",
    "kind": "LinkedField",
    "name": "team",
    "plural": true,
    "selections": [
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
    "name": "TableQuery",
    "selections": (v0/*: any*/),
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "TableQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "39b92fa89028de512506f684543eb6ff",
    "id": null,
    "metadata": {},
    "name": "TableQuery",
    "operationKind": "query",
    "text": "query TableQuery {\n  team {\n    name\n    logo\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'b76970ab966a77531266834c200b86d4';

module.exports = node;
