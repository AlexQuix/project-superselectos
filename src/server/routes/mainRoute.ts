import {Router} from "express";
const route:Router = Router();

// Import Controllers
import {MainController} from "../controllers/mainController"


// Router
route.get("/", MainController.index);


export default route;