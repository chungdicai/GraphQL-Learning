const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
// 定義schema，查詢和類型
const schema = buildSchema(`
    type Query {
        getClassMates(classNo: Int!): [String]
    }
`);
// 定義查詢對應的處理器
const root = { 
    getClassMates({classNo}){
        const obj = {
            31: ['Jung','George','Ken','Tao','Ryder','Ryan'],
            61: ['Vic','RJ','Arthur'],
        }
        return obj[classNo]
    }
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(3000, () => console.log('Now browse to localhost:3000/graphql'));