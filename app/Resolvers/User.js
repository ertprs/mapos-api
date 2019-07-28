'use strict'

const User = use('App/Models/User')
const Person = use('App/Models/Person')
const Permission = use('App/Models/Permission')
const Employee = use('App/Models/Employee')
const { validateAll } = use('Validator')
const GraphQLError = use('Adonis/Addons/GraphQLError')
const { combineResolvers } = require('graphql-resolvers')
const isAuthenticated = require('../Utils/common_resolvers')

const resolvers = {

    Query: {
        users: combineResolvers(
            isAuthenticated,
            async () => {
                const users = await User.all()
                return users.toJSON()
            }
        ),
        user: combineResolvers(
            isAuthenticated,
            async (_, { id }) => {
                const user = await User.find(id)
                return user
            }
        ),
        me: combineResolvers(
            isAuthenticated,
            async (_) => {
                return _.context.user;
            }
        )
    },

    Mutation: {
        async createUser(_, data) {
            const rules = {
                first_name: 'required',
                email: 'required|email|unique:users,email',
                password: 'required',
                permission_id: 'required',
                person_id: 'required|unique:users,person_id',
                password_confirmation: 'required_if:password|same:password',
            }
            const validation = await validateAll(data, rules)
            if (validation.fails()) {
                throw new GraphQLError('Validation Failed', validation.messages())
            }
            delete data.password_confirmation
            return await User.create(data)
        },
        // Handles user login
        async login(_, { email, password }, { auth }) {
            const { token } = await auth.attempt(email, password)
            return token
        }
    },

    User: {
        async person({ person_id }) {
            const person = await Person.find(person_id)
            return person
        },
        async permission({ permission_id }) {
            const permission = await Permission.find(permission_id)
            return permission
        },
        async employee({ person_id }) {
            const employee = await Employee.find(person_id)
            return employee
        }
    }

}

module.exports = resolvers