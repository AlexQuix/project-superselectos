import express from "express";
import path from "path";
import morgan from "morgan";
import ejs from "ejs";

// initialize
const app = express();


// Settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.engine(".ejs", ejs.renderFile);


// Middleware
app.use(morgan("dev"));
app.use("/public/", express.static(path.resolve(__dirname, "public")));


// ImportRoutes
import {mainRoute} from "./routes/index";


// Routes
app.use(mainRoute);


// PORT
app.listen(app.get("port"), ()=>{
    console.log("Server conected in the port " + app.get("port"));  
});