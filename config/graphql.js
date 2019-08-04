'use strict'

const { join } = require('path')
const depthLimit = require('graphql-depth-limit')
const Env = use('Env')


module.exports = {
  options: {
    debug: false,
    endpointURL: '/',
    validationRules: [depthLimit( Env.get('APP_DEPTH_LIMIT', 3) )]
  },

  schema: join(__dirname, '../app/Schema'),
  resolvers: join(__dirname, '../app/Resolvers'),
}
