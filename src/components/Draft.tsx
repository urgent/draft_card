import React from "react";
import { graphql } from "babel-plugin-relay/macro";
import { QueryRenderer, requestSubscription } from "react-relay";
import { environment } from "../relay/Environment";
import { DataGrid, ValueFormatterParams } from "@material-ui/data-grid";
import { Picks } from "./Pick";

const DraftQuery = graphql`
  query DraftQuery($draftID: Int!) {
    teams_connection(order_by: { rank: asc }) {
      edges {
        node {
          logo
          name
          team_id
          id
          rank
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
          picks_timestamps
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
          picks_timestamps
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

export function calculate({
  draft_order,
  rounds,
  picks,
}: {
  draft_order: string[];
  rounds: number;
  picks: string[];
}) {
  // create array from rounds and draft_order
  const arr = Array.from({ length: rounds }, (_, idx) => draft_order);
  // flatten two dimensional array
  const result = [].concat.apply([], arr as any);
  // slice array, too many items slow the render
  return result.slice(Math.max(picks.length, 0), picks.length + 4);
}

export function timer({
  interval,
  picks_timestamps,
}: {
  interval: number;
  picks_timestamps: number[];
}) {
  const now = Date.now();
  const res = picks_timestamps.slice(-1)[0] + interval * 1000 - now;
  if (res <= 0) {
    return interval * 1000;
  }
  return res;
}

export function Draft({ draft, user }: { draft: number; user: string }) {
  return (
    <QueryRenderer
      environment={environment}
      query={DraftQuery}
      variables={{ draftID: draft }}
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
            rowHeight={64}
          />
        );

        const draft = props.drafts_connection.edges[0].node;
        const steps = calculate({
          draft_order: draft.draft_order,
          rounds: draft.rounds,
          picks: draft.picks,
        });

        return (
          <div style={{ height: 600, width: "100%" }}>
            <Picks
              steps={steps}
              user={user}
              interval={timer({
                interval: draft.interval,
                picks_timestamps: draft.picks_timestamps,
              })}
            />
            {grid}
          </div>
        );
      }}
    />
  );
}
