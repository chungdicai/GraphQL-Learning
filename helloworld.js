const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
// 定義schema，查詢和類型
const schema = buildSchema(`
  type Account {
      name: String
      age: Int
      sex: String
      department: String
  }
  type Query {
    hello: String
    accountName: String
    age: Int
    account: Account
  }
`);
// 定義查詢對應的處理器
const root = { 
    hello: () => 'Hello world!' ,
    accountName: ()=> 'Jung',
    age: ()=> 18,
    account: () => {
        return {
            name: "Jung",
            age: 18,
            sex: 'Male',
            department: 'DM'
        }
    },
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(3000, () => console.log('Now browse to localhost:3000/graphql'));