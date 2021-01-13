import { ApolloServer } from 'apollo-server'
import { v4 as uuid } from 'uuid'

import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

const findLinkByID = id => links.find(link => link.id === id)
const resolvers = {
  Query: {
    info: () => 'This is the API of a Hackernews Clone',
    feed: () => links,
    link: (_, args) => findLinkByID(args.id)
  },
  Mutation: {
    post: (_, args) => {
      const link = {
        id: `link-${uuid()}`,
        description: args.description,
        url: args.url
      }
      links.push(link)
      return link
    },
    updateLink: (_, args) => {
      const link = findLinkByID(args.id)
      if (args.url) link.url = args.url
      if (args.description) link.description = args.description
      return link
    }
  }
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers
})

server
  .listen({ port: process.env.PORT || 4000 })
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  )
