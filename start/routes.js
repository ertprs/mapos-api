const Route = use('Route')
const GraphQLServer = use('GraphQLServer')

Route.post('/', (context) => {
  return GraphQLServer.handle(context)
})

// Route.get('/graphiql', (context) => {
//  return GraphQLServer.handleUI(context, {
//    passHeader: `'Authorization': '${context.request.header("Authorization")}'`
//  })
// })

// or add options (example)
Route.get("/graphiql", (context) => {
  return GraphQLServer.handleUI(context, {
    passHeader: `'Authorization': 'meu-token'`
  })
})