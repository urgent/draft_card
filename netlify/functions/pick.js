const graphql = require('../includes/graphql')

const DraftQuery = `query DraftQuery {
  drafts_by_pk(id:1) {
    draft_order
    interval
    start
  }
}`;

exports.handler = async function (event, context) {
  // is username post set, validate post
  const payload = await graphql.fetchQuery(DraftQuery)

  // validate draft

  // is draft over

  // authenticate, is username in draft order

  // is user in post the draft's next pick?

  // 
  return {
    statusCode: 200,
    body: JSON.stringify(payload)
  };
}