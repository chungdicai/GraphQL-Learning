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
        salary(city: String): Int
    }
    type Query {
        account(username: String): Account
        getClassMates(classNo: Int!): [String]
    }
`);
// 定義查詢對應的處理器
const root = { 
    account: ({username}) => {
        const name = username;
        const sex = 'Male';
        const age = 18;
        const department = 'DM'
        const salary = ({city}) => {
            if(city === '台北' || city === '新北') {
                return 100000
            }
            return 80000
        }
        return {
            name,
            age,
            sex,
            department,
            salary
        }
    },
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
// 公開文件夾，供用戶訪問靜態資源
app.use(express.static('public'))

app.listen(3000, () => console.log('Now browse to localhost:3000/graphql'));