'use strict'

const { combineResolvers } = require('graphql-resolvers');

const baseResolver = (root, args, context, info) => {
    /*
      Only mask outgoing errors that aren't already apollo-errors,
    */
    (root, args, context, error) => isInstance(error) ? error : new Error('An unknown error has occurred! Please try again later')
}

const isAuthenticated = combineResolvers( baseResolver,  (root, args, context, info) => {
    if (!context.request.header("Authorization")) {
        return new Error('You must be logged in to do this')
    }
});

module.exports = isAuthenticated