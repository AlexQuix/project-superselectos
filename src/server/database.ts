import {MongoClient} from "mongodb";


let {MONGODB_URI} = process.env;


export default MongoClient
                .connect(                    
                    (MONGODB_URI as string),
                    {
                        useUnifiedTopology: true
                    })
                .catch(e=>console.log(e));