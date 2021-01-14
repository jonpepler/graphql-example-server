import { pubsubKeys } from './Subscription.js'

export const Mutation = {
  post: async (parent, args, { prisma, pubsub }, info) => {
    const newLink = await prisma.link.create({
      data: {
        url: args.url,
        description: args.description
      }
    })
    pubsub.publish(pubsubKeys.newLink, newLink)
    return newLink
  },
  updateLink: async (_, { id, url, description }, { prisma }) => prisma.link.update({
    where: { id: parseInt(id) },
    data: {
      url,
      description
    }
  }),
  deleteLink: async (_, { id }, { prisma }) => prisma.link.delete({ where: { id: parseInt(id) } }),
  vote: async (parent, { linkId }, { prisma, pubsub }, info) => {
    const newVote = await prisma.vote.create({
      data: {
        link: { connect: { id: parseInt(linkId) } }
      }
    })
    pubsub.publish(pubsubKeys.newVote, newVote)

    return newVote
  }
}
