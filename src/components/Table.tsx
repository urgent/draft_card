import React from "react";
import { graphql } from "babel-plugin-relay/macro";
import { QueryRenderer } from "react-relay";
import { environment } from "../relay/Environment";

const TableQuery = graphql`
  query TableQuery {
    teams {
      name
      logo
    }
  }
`;

export function Table() {
  return (
    <QueryRenderer
      environment={environment}
      query={TableQuery}
      variables={{}}
      render={({ error, props }: { error: any; props: any }) => {
        if (error) {
          return <div>Error!</div>;
        }
        if (!props) {
          return <div>Loading...</div>;
        }
        return <div>Team: {props.teams[0].name}</div>;
      }}
    />
  );
}
