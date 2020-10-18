import {Response, Request} from "express";
import database from "../modules/CRUD";
import {Db, ObjectId, Cursor} from "mongodb"


interface IProduct{
    name:string, 
    wordkey:string, 
    price:string, 
    classification:string, 
    description:string,
    image: string
}


class ProductRestAPI{
    async getProducts(req:Request, res:Response){
        let send, skip;
        switch(req.params.operation){
            case "general":
                var count = await (await database.getDB()).collection("products").countDocuments();
                let random = Math.random() * count;
                if(random > 6){
                    skip = Math.floor((random - 5));
                }else{
                    skip = 9;
                }
                var cursor = (await database.read("products", {})).skip(skip).limit(5);
                send = await cursor.toArray();
            break;
            case "product":
                var query = req.body;
                var cursor = await database.read("products", {_id: new ObjectId(req.body.id)}).catch(e=>console.log(e));
                send = cursor;
            break;
            case "clasification":
                var cursor = await database.read("products", {classification: {
                    $regex: req.params.clasification
                }}, true)
                send = await cursor.toArray();
            break;
            case "keyword":
                var query:any = {name: {
                    $regex: req.body.word
                }};
                var cursor = (await database.read("products", query, true)).limit(7);
                send = await cursor.toArray();
            break;
            case "query":
                var cursor = await database.read("products", {_id: new ObjectId((req.body.id))}).catch(e=>console.log(e));
                send = JSON.stringify(cursor);
            break;
        }
        res.send(send);
    }
    async createProduct(req:Request, res:Response):Promise<void>{
        const {name, wordkey, price, classification, description} = (req.body as IProduct);
        const image = req.file.filename;
        if(name && wordkey && price && classification && description && image){
            const query:IProduct = {
                name: name, 
                wordkey: wordkey, 
                price: price, 
                classification: classification, 
                description:description,
                image: image
            };
            const {result} = await database.create("products", query);
            res.json(result);
        }
        res.json({"message": "Proporciona todos los campos solicitados"});
    }
    async getProductOrId(req:Request, res:Response):Promise<void>{
        let id = req.params.id;
        if(id){
            const data = await database.read("products", {_id: new ObjectId(id)}, true).catch(e=>console.log(e));
            res.send(data);
        }
    }
    async getProductsClasification(req:Request, res:Response):Promise<void>{
        const classification = req.params.classification;
        
        // var count:number = await (await database.getDB()).collection("products").countDocuments();
        // let random:number = Math.random() * count;
        // let skip:number;
        // (random > 6)? skip = Math.floor((random - 5))
        // : skip = 9;

        if(classification === "general"){
            var cursor = (await database.read("products", {}))//.skip(skip).limit(5).catch(e=>console.log(e));
            const send = await cursor.toArray();
            res.json(send);
        }else{
            const cursor = await database.read("products", {classification}).catch(e=>console.log(e));
            res.json(await (cursor as Cursor).toArray());
        }
        
    }
    async getKeyword(req: Request, res:Response):Promise<void>{
        const keyword = req.params.keyword;
        const query = {
            wordkey: {
                $regex: keyword
            }
        }
        const cursor = await database.read("products", query).catch(e=>console.log(e));
        res.send(await (cursor as Cursor).toArray());
    }
}

export default new ProductRestAPI();