# graphql-example-server
A simple server running Apollo, built roughly following [howtographql.com/graphql-js](https://www.howtographql.com/graphql-js/).

Designed to work with the example client ([repo](https://github.com/jonpepler/graphql-example-client)/[gh-page](https://jonpepler.github.io/graphql-example-client/)).

Hosted on [Heroku](https://graphql-example-server.herokuapp.com/).

# setup
Ensure that you have Docker installed for running the database.

Add to your local .env file:
```
DATABASE_URL="postgresql://postgres:dev@localhost:5432/postgres"
```

# run
```npm run start```

Go to http://localhost:4000.

# dev
```npm run dev```

Go to http://localhost:4000.