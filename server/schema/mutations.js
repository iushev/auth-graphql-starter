const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
} = graphql;
const AuthService = require('../services/auth');

const UserType = require('./types/user_type');

const mutations = new GraphQLObjectType({
    name : 'Mutations',
    fields: {
        signup: {
            type: UserType,
            args: {
                email: {
                    type: GraphQLString,
                },
                password: {
                    type: GraphQLString,
                }
            },
            resolve(parentValue, { email, password}, req) {
                return AuthService.signup({ email, password, req});
            }
        },
        logout: {
            type: UserType,
            resolve(parentValue, agrs, req) {
                const { user } = req;
                req.logout();
                return user;
            }
        },
        login: {
            type: UserType,
            args: {
                email: {
                    type: GraphQLString,
                },
                password: {
                    type: GraphQLString,
                },
            },
            resolve(parentValue, { email, password }, req) {
                return AuthService.login({ email, password, req });
            }
        }
    },
});

module.exports = mutations;