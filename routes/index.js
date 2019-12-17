import { Router } from "express";
import Controller from "../controllers/controller";
const routes = Router();
routes.get("/", Controller.init);
routes.get("/loginhr", Controller.loginHR);
routes.get("/getHR", Controller.getHR);
routes.get("/getAllpositions", Controller.getAllPositions);
routes.get("/getAllHR", Controller.getAllHR);


export default routes;
