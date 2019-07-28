const Route = use('Route')
const GraphQLServer = use('GraphQLServer')

Route.route('/', (context) => {
  return GraphQLServer.handle(context)
}, ['GET', 'POST'])

// or add options (example)
Route.get("/graphiql", (context) => {
  return GraphQLServer.handleUI(context, {
    passHeader: `'Authorization': 'Bearer token_here'`
  })
})