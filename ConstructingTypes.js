const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const graphql = require("graphql");

const AccountTye = new graphql.GraphQLObjectType({
    name: 'Account',
    fields: {
        name: { type: graphql.GraphQLString },
        age: { type: graphql.GraphQLInt },
        sex: { type: graphql.GraphQLString },
        department: { type: graphql.GraphQLString },
    }
})

const queryType = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
        account: {
            type: AccountTye,
            args: {
                username: {type: graphql.GraphQLString}
            },
            resolve: function (_, { username }) {
                const name = username
                const sex = 'man'
                const age = 18
                const department = 'DM'
                return {
                    name,
                    sex,
                    age,
                    department
                }
            }
        },
    }
})

const schema = new graphql.GraphQLSchema({query:queryType})

const app = express();

app.use("/graphql", graphqlHTTP({
  schema: schema,
  graphiql: true,
}));
app.listen(3000, () => console.log("Now browse to localhost:3000/graphql"));

// query {
//     account(username: "Jung") {
//       name
//       age
//       sex
//       department
//     }
//   }
