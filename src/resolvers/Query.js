import { findLinkByID } from './helpers.js'

export const Query = {
  info: () => 'This is the API of a Hackernews Clone',
  feed: async (parent, { filter }, { prisma }) => prisma.link.findMany(filter
    ? {
        where: {
          OR: [
            { url: { contains: filter } },
            { description: { contains: filter } }
          ]
        }
      }
    : {}),
  link: (_, args, { prisma }) => findLinkByID(args.id, prisma)
}
