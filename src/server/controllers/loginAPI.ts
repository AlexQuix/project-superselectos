import {Request, Response} from "express";
import dataBase from "../modules/CRUD"


class RestAPILogin{
    async createUser(req:Request, res:Response){
        let {result} = await dataBase.create("users", req.body);
        if(result.n === 1 && result.ok === 1){
            req.body.message = "ok";
            res.json(req.body);
        }else{
            req.body.message = "err";
            res.json(req.body);
        }
    }
    async checkUserName (req:Request, res:Response){
        res.setHeader("Content-Type", "text/plain");
        let result = await dataBase.read("users", req.body, true).catch(e=>console.log(e));
        if(!result){
            res.send("ok");
        }else{
            res.send("El nombre de usuario ingresado no esta disponible");
        }
    }
    async getUser(req:Request, res:Response){
        res.setHeader("Content-Type", "application/json");
        const {user, password} = req.body
        let cursor = await dataBase.read("users", {$and: [{user: user}, {password: password}]}, true);
        (!cursor)? cursor = {message: "err"}
        : cursor.message = "ok";
        res.json(cursor);
    }
}

export default new RestAPILogin();