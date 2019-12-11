import { Router } from "express";
import Controller from "../controllers/controller";
const routes = Router();
routes.get("/", Controller.init);
routes.get("/all", Controller.getAllUsers);

export default routes;
