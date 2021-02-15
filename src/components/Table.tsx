import React, { ReactChildren } from "react";
import { graphql } from "babel-plugin-relay/macro";

const TableQuery = graphql`
  query TableQuery {
    team {
      name
      logo
    }
  }
`;

export function Table() {
  return;
}
