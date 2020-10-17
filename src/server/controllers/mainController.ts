import {Request, Response} from "express";


class MainController{
    static index(req:Request, res:Response){
        res.render("home");
    }
}

export {MainController};