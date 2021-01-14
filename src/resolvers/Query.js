import { findLinkByID } from './helpers.js'

export const Query = {
  info: () => 'This is the API of a Hackernews Clone',
  feed: async (parent, { filter }, { prisma }) => {
    const links = await prisma.link.findMany(filter
      ? {
          where: {
            OR: [
              { url: { contains: filter } },
              { description: { contains: filter } }
            ]
          }
        }
      : {})
    return {
      links,
      count: links.length
    }
  },
  link: (_, args, { prisma }) => findLinkByID(args.id, prisma)
}
