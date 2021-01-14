const votes = async ({ id }, args, { prisma }) => {
  return prisma.link.findUnique({ where: { id } }).votes()
}

export const Link = {
  votes,
  voteCount: async (parents, args, context) => (await votes(parents, args, context)).length
}
