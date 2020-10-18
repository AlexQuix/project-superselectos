import {Router} from "express";
const route:Router = Router();

// Import Controllers
import {MainController} from "../controllers/mainController"


// Router
route.get("/", MainController.indexPage);
route.get("/login(/:login)?", MainController.loginPage);
route.get("/product/clasification/:clasification", MainController.productPage);
route.get("/about", MainController.aboutPage);
route.get("/payment", MainController.paymentPage);
route.get("/product/form", MainController.productAddPage);


export default route;