const fetch = require('node-fetch')

exports.fetchQuery = function (query, variables) {
    return fetch("https://draftcard.hasura.app/v1/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    }).then((response) => {
        return response.json();
    });
}