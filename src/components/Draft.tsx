import React from "react";
import { graphql } from "babel-plugin-relay/macro";
import { QueryRenderer, requestSubscription } from "react-relay";
import { environment } from "../relay/Environment";
import { DataGrid, ValueFormatterParams } from "@material-ui/data-grid";

const DraftQuery = graphql`
  query DraftQuery($draftID: Int!) {
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
    drafts_connection(where: { id: { _eq: $draftID } }) {
      edges {
        node {
          draft_order
          id
          interval
          picks
          rounds
          start
        }
      }
    }
  }
`;

const subscription = graphql`
  subscription DraftQuerySubscription($draftID: Int!) {
    drafts_connection(where: { id: { _eq: $draftID } }) {
      edges {
        node {
          draft_order
          id
          interval
          picks
          rounds
          start
        }
      }
    }
  }
`;

const variables = {
  draftID: 3,
};

requestSubscription(
  environment, // see Environment docs
  {
    subscription,
    variables,
    // optional but recommended:
    onCompleted: () => {
      // server closed the subscription
    },
    onError: (error) => console.error(error),
  }
);

const columns = [
  {
    field: "logo",
    headerName: " ",
    sortable: false,
    width: 100,
    renderCell: (params: ValueFormatterParams) => (
      <img alt={"Team Logo"} src={params.value as string} />
    ),
  },
  { field: "name", headerName: "Team", width: 130 },
];

export function Draft() {
  return (
    <QueryRenderer
      environment={environment}
      query={DraftQuery}
      variables={{ draftID: 3 }}
      render={({ error, props }: { error: any; props: any }) => {
        if (error) {
          return <div>Error!</div>;
        }
        if (!props) {
          return <div>Loading...</div>;
        }

        const teams = props.teams_connection.edges.map((edge: any) => ({
          id: edge.node.team_id,
          ...edge.node,
        }));

        const grid = (
          <DataGrid
            rows={teams}
            columns={columns}
            pageSize={5}
            checkboxSelection
            rowHeight={78}
          />
        );

        return (
          <div style={{ height: 400, width: "100%" }}>
            <h2>{props.drafts_connection.edges[0].node.picks}</h2>
            {grid}
          </div>
        );
      }}
    />
  );
}
