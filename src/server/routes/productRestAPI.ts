import {Router} from "express";
import productRestAPI from "../controllers/productAPI";

const route = Router();


route.get("/get/:id", productRestAPI.getProductOrId);
route.get("/clasification/:classification", productRestAPI.getProductsClasification);
route.post("/search-:operation/(:clasification)?", productRestAPI.getProducts);
route.post("/create", productRestAPI.createProduct);
route.get("/keyword/:keyword", productRestAPI.getKeyword);


export default route;