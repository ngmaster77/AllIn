import graphql,  { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql'
import UserType                                                   from './types/user_type'
import AuthService                                                from '../services/auth'

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        password: { type: GraphQLString },
        role: { type: GraphQLInt },
        nBets: { type: GraphQLInt },
        wBets: { type: GraphQLInt },
      },
      resolve(parentValue, { name, password, role }, req) {
        console.log("HOLAA")
        return AuthService.signup({ name, password, role,  req })
      }
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        const { user } = req
        req.logout()
        return user
      }
    },
    login: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { name, password }, req) {
        return AuthService.login({ name, password, req })
      }
    },
  }
})

module.exports = mutation