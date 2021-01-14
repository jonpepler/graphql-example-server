import { findLinkByID } from './helpers.js'

export const Query = {
  info: () => 'This is the API of a Hackernews Clone',
  feed: async (parent, args, { prisma }) => prisma.link.findMany(),
  link: (_, args, { prisma }) => findLinkByID(args.id, prisma)
}
