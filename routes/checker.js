import { Router } from "express";
import Controller from "../controllers/controller";
const routes = Router();

routes.get('/',function (req,res,next) {
    res.render("ajax");
});

routes.get('/',function (req,res,next) {
    let name = req.query.name;
    if(name === ""){
        res.send("<br/>  enter a proper value");
    }
});

export default routes;