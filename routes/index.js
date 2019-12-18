import { Router } from "express";
import Controller from "../controllers/controller";
const routes = Router();

routes.get("/", Controller.init);
routes.get("/login-hr", Controller.loginHR);
routes.get("/home-page",Controller.userHomePage);
routes.get("/hr-index", Controller.HRHomePage);
routes.get("/positions",Controller.viewPositions);
routes.post("/get-hr", Controller.getHR);
routes.post('/get-user', Controller.getUser);
routes.get("/get-all-hr", Controller.getAllHR);
routes.get("/sign-up", Controller.signUp);
export default routes;