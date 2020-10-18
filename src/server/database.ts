import {MongoClient} from "mongodb";


let {MONGODB_URI} = process.env;
console.log(MONGODB_URI);

const mongo = MongoClient
.connect(
    (MONGODB_URI as string),{
        useUnifiedTopology: true
    }
);

export {mongo};