import { ApolloServer } from 'apollo-server'
import { v4 as uuid } from 'uuid'

import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

import pkg from '@prisma/client'
const { PrismaClient } = pkg
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const findLinkByID = async (id, prisma) => prisma.link.findUnique({ where: { id: parseInt(id) } })
const resolvers = {
  Query: {
    info: () => 'This is the API of a Hackernews Clone',
    feed: async (parent, args, { prisma }) => prisma.link.findMany(),
    link: (_, args, { prisma }) => findLinkByID(args.id, prisma)
  },
  Mutation: {
    post: async (parent, args, { prisma }, info) => {
      const newLink = await prisma.link.create({
        data: {
          url: args.url,
          description: args.description
        }
      })
      return newLink
    },
    updateLink: async (_, { id, url, description }, { prisma }) => prisma.link.update({
      where: { id: parseInt(id) },
      data: {
        url,
        description
      }
    }),
    deleteLink: async (_, { id }, { prisma }) => prisma.link.delete({ where: { id: parseInt(id) } })
  }
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
  context: {
    prisma: new PrismaClient()
  }
})

server
  .listen({ port: process.env.PORT || 4000 })
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  )
