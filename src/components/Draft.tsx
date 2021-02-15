import React from "react";
import { graphql } from "babel-plugin-relay/macro";
import { QueryRenderer } from "react-relay";
import { environment } from "../relay/Environment";
import { DataGrid, ValueFormatterParams } from "@material-ui/data-grid";

const DraftQuery = graphql`
  query DraftQuery {
    teams {
      team_id
      name
      logo
    }
  }
`;

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
      variables={{}}
      render={({ error, props }: { error: any; props: any }) => {
        if (error) {
          return <div>Error!</div>;
        }
        if (!props) {
          return <div>Loading...</div>;
        }
        const teams = props.teams.map((team: any) => ({
          id: team.team_id,
          ...team,
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
            Team: {teams[0].name}
            {grid}
          </div>
        );
      }}
    />
  );
}
