'use strict'

const User = use('App/Models/User')
const { validateAll } = use('Validator')
const GraphQLError = use('Adonis/Addons/GraphQLError')
const { combineResolvers } = require('graphql-resolvers')
const isAuthenticated = require('../Utils/common_resolvers')

// const users = async () => {
//     const users = await User.all()
//     return users.toJSON()
// }
// console.log(isAuthenticated);

const resolvers = {

    Query: {
        users: combineResolvers(
            isAuthenticated,
            async () => {
                const users = await User.all()
                return users.toJSON()
            }
        ),

        async user(_, { id }) {
            const user = await User.first(id)
            return user.toJSON()
        }
    },

    Mutation: {
        async createUser(_, data) {
            const rules = {
                username: 'required|unique:users,username',
                email: 'required|email|unique:users,email',
                password: 'required',
                password_confirmation: 'required_if:password|same:password',
            }

            const validation = await validateAll(data, rules)

            if (validation.fails()) {
                throw new GraphQLError('Validation Failed', validation.messages())
            }

            delete data.password_confirmation

            return await User.create(data)
        },
    },

    User: {

    }

}

module.exports = resolvers