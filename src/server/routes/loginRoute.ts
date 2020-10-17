import {Router} from "express";
import {MongoClient} from "mongodb";
import client from "../database"



// REQUEST POST THE ROUTE LOGIN
const route = Router();
console.log(client);


// route.post("/login/signup/create-user", async function(req, res){
//     req.body = await BusBoy.formdata(req).catch(e=>console.log(e));
//     let cursor = await CRUD.create("user", req.body);
//     if(cursor.result.n === 1 && cursor.result.ok === 1){
//         let json = JSON.stringify(req.body);
//         res.end(json);
//     }else{
//         res.end("err");
//     }
// });
// route.post("/login/signup/cheek-user", async function(req, res){
//     res.setHeader("Content-Type", "text/plain");
//     let result = await CRUD.read("user", req.body).catch(e=>console.log(e));
//     if(!result){
//         res.send("ok");
//     }else{
//         res.send("Este nombre ya esta en uso");
//     }
// });
// route.post("/login/signin/cheek-data", async function(req, res){
//     res.setHeader("Content-Type", "application/json");
//     let cursor = await CRUD.read("user", {$and: [{user: req.body.user}, {password: req.body.password}]});
//     (!cursor)? cursor = {message: "err"}: cursor.message = "ok";
//     res.send(cursor);
// });


export default route;