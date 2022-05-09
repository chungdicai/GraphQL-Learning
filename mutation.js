const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
// 定義schema，查詢和類型
const schema = buildSchema(`
    input AccountInput {
        name: String
        age: Int
        sex: String
        department: String
    }
    type Account {
        name: String
        age: Int
        sex: String
        department: String
    }
    type Mutation {
        createAccount(input: AccountInput): Account
        updateAccount(id: ID!, input: AccountInput): Account
    }
    type Query {
        accounts: [Account]
    }
`);

const fakeDb = {};
// 定義查詢對應的處理器
const root = { 
    accounts () {
        let arr = [];
        for(let key in fakeDb) {
            arr.push(fakeDb[key])
        }
        return arr
    },
    createAccount({ input }){
        fakeDb[input.name] = input;
        return fakeDb[input.name];
    },
    updateAccount({ id, input }){
        const updatedAccount = Object.assign({},fakeDb[id],input);
        fakeDb[id] = updatedAccount;
        return updatedAccount;
    }
};

const app = express();
app.use("/graphql", graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(3000, () => console.log("Now browse to localhost:3000/graphql"));


// mutation {
//     createAccount(input: {
//         name: "Jung",
//         age: 18,
//         sex: "Male",
//         department: "DM"

//     }) {
//         name
//         age
//         sex
//         department
//     }
// }

// query {
//     accounts {
//       name
//       age
//       sex
//       department
//     }
//   }

// mutation {
//     updateAccount(id: "Jung",input: {
//         name: "Jung1",
//         age: 22,
//         sex: "Male",
//         department: "DM"

//     }) {
//         name
//         age
//         sex
//         department
//     }
// }
