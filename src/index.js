import { ApolloServer, PubSub } from 'apollo-server'
import pkg from '@prisma/client'

import { Query, Mutation, Subscription, Link, Vote } from './resolvers/index.js'

import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const { PrismaClient } = pkg
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const resolvers = {
  Query,
  Mutation,
  Subscription,
  Link,
  Vote
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
  context: {
    prisma: new PrismaClient(),
    pubsub: new PubSub()
  }
})

server
  .listen({ port: process.env.PORT || 4000 })
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  )
