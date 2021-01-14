export const Vote = {
  link: async ({ id }, args, { prisma }) => prisma.vote.findUnique({ where: { id } }).link()
}
