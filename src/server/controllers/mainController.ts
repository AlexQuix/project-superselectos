import {Request, Response} from "express";


class MainController{
    static indexPage(req:Request, res:Response):void{
        res.render("home");
    }
    static loginPage(req:Request, res:Response):void{
        let loginQuery = req.params.login;
        if(loginQuery){
            res.render("login", {login: loginQuery});
        }else{
            res.status(302).redirect("/login/signin");
        }
    }
    static productPage(req:Request, res:Response):void{
        res.render("product", {clasification: req.params.clasification});
    }
    static aboutPage(req:Request, res:Response):void{
        res.render("about")
    }
    static paymentPage(req:Request, res:Response):void{
        res.render("payment");
    }
    static productAddPage(req:Request, res:Response):void{
        res.render("product-form")
    }
}

export {MainController};