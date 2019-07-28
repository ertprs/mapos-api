'use strict'

const { combineResolvers } = require('graphql-resolvers');
const GraphQLError = use('Adonis/Addons/GraphQLError')

const baseResolver = (root, args, context, info) => {
    /*
      Only mask outgoing errors that aren't already apollo-errors,
    */
    (root, args, context, error) => isInstance(error) ? error : new GraphQLError('An unknown error has occurred! Please try again later')
}

const isAuthenticated = combineResolvers(baseResolver, async (root, args, context, info) => {

    try {
        // Check if user is logged in
        await context.auth.check()

        // Get the authenticated user
        const user = await context.auth.getUser()
        return context.user = user;
        
    } catch (error) {
        // Throw error if user is not authenticated
        throw new GraphQLError('Missing or invalid jwt token')
    }

});

module.exports = isAuthenticated