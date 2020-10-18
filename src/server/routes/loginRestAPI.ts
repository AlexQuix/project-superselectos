import {Router} from "express";
import RestAPILogin from "../controllers/loginAPI"


const route = Router();


// ROUTE
route.post("/signup/create-user", RestAPILogin.createUser);
route.post("/signup/cheek-user", RestAPILogin.checkUserName);
route.post("/signin/get-user", RestAPILogin.getUser);


export default route;