export const findLinkByID = async (id, prisma) => prisma.link.findUnique({ where: { id: parseInt(id) } })
