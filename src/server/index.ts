import express from "express";
import path from "path";
import morgan from "morgan";
import ejs from "ejs";
import multer from "multer";
import cors from "cors";


// initialize
const app = express();
import "./database";


// Settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.engine(".ejs", ejs.renderFile);


const storage = multer.diskStorage({
    destination: path.resolve(__dirname, "public", "uploads"),
    filename(req, file, cb){
        console.log(file);
        cb(null, (new Date().getTime() + path.extname(file.originalname)))
    }
})

;
// Middleware
app.use(morgan("dev"));
app.use("/public/", express.static(path.resolve(__dirname, "public")));
app.use(multer({storage}).single("image"));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());


// ImportRoutes
import {mainRoute, loginRestAPI, productRestAPI} from "./routes/index";


// Routes
app.use(mainRoute);
app.use("/api/login", loginRestAPI);
app.use("/api/products", productRestAPI);


// PORT
app.listen(app.get("port"), ()=>{
    console.log("Server conected in the port " + app.get("port"));  
});