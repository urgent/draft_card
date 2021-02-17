const query = require('../includes/graphql')

exports.handler = async function (event, context) {
    const payload = await query.fetchQuery(`query MyQuery {
        teams {
          name
        }
      }`)
    return {
        statusCode: 200,
        body: JSON.stringify(payload)
    };
}