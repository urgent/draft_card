/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type TableQueryVariables = {||};
export type TableQueryResponse = {|
  +teams: $ReadOnlyArray<{|
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
  teams {
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
    "cacheID": "0de9c5b1902b061d2a69f10e8aa77af3",
    "id": null,
    "metadata": {},
    "name": "TableQuery",
    "operationKind": "query",
    "text": "query TableQuery {\n  teams {\n    name\n    logo\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '699cfbbb748353b384cfdaf33601f1f0';

module.exports = node;
