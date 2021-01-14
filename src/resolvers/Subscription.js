export const pubsubKeys = {
  newLink: 'NEW_LINK',
  newVote: 'NEW_VOTE'
}

const buildSub = (key) => ({
  subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator(key),
  resolve: payload => payload
})

export const Subscription = {
  newLink: buildSub(pubsubKeys.newLink),
  newVote: buildSub(pubsubKeys.newVote)
}
