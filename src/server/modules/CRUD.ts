import {mongo} from "../database";
import {Db, FilterQuery, Collection, InsertOneWriteOpResult, InsertWriteOpResult, Cursor} from "mongodb";

let db:Db;
mongo.then((client)=>{
    db = client.db("superselectos");
})
.catch(e=>console.log(e));

type createOptResult = InsertOneWriteOpResult<any> | InsertWriteOpResult<any>;
type readOptResult = Cursor<any> | any

class dbCRUD{
    async create(collectionName:string, filterQuery:FilterQuery<any>):Promise<createOptResult>{
        const collection:Collection = db.collection(collectionName);
        let data: createOptResult;
        (typeof filterQuery === "object")? data = await collection.insertOne(filterQuery)
        : data = await collection.insertMany(filterQuery as any[]);
        return data;
    }
    async read(collectionName:string, filterQuery:FilterQuery<any>, oneDocument:boolean = false):Promise<readOptResult>{
        const collection = db.collection(collectionName);
        let data:any;
        (oneDocument)? data = await collection.findOne(filterQuery)
        : data = await collection.find(filterQuery);
        return data;
    }
    async getDB():Promise<Db>{
        return db;
    }
}

export default new dbCRUD();