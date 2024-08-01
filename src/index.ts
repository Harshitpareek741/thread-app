import express, { query } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';

async function serverStart (){
 
const app = express();
const port = Number(process.env.PORT) || 8000;
    const server = new ApolloServer({
        typeDefs : `
         type Query{
           hello : String 
           say(name : String) : String
         }
        `,
        resolvers: {
          Query:{
            hello : () => 'hello bro how are u',
            say: (parent,{name}) => `hii ${name}`
          }
        }
      });
     
      await server.start();
      
      app.use('/graphql', cors(), express.json(), expressMiddleware(server));

      app.listen(port,()=>{
        console.log(`server started on port ${port}`);
        });
    
app.get("/",(req,res)=>{
    res.json({message : "server is running"});
});

}

serverStart();
