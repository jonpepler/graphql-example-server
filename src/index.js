import { ApolloServer } from 'apollo-server'

const typeDefs = `
  type Query {
    info: String!
    feed: [Link!]!
  }

  type Mutation {
    post(url: String!, description: String!): Link!
  }

  type Link {
    id: ID!
    description: String!
    url: String!
  }
`
const links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

const resolvers = {
  Query: {
    info: () => 'This is the API of a Hackernews Clone',
    feed: () => links
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server
  .listen({ port: process.env.PORT || 4000 })
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  )
