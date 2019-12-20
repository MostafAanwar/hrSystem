import { Router } from "express";
import Controller from "../controllers/controller";
const routes = Router();

routes.get("/", Controller.init);
routes.get("/login-hr", Controller.loginHR);
routes.get("/home-page",Controller.userHomePage);
routes.get("/hr-index", Controller.HRHomePage);
routes.get("/get-positions", Controller.GetPositionPage);
routes.get("/positions",Controller.viewPositions);
routes.post("/get-hr", Controller.getHR);
routes.post('/get-user', Controller.getUser);
routes.get("/get-all-hr", Controller.getAllHR);
routes.get("/sign-up", Controller.signUp);
routes.post("/delete-pos",Controller.deletePosition);
routes.get("/add-pos-page", Controller.addPositionPage);
routes.post("/add-pos", Controller.addPosition);
routes.post("/apply-pos", Controller.applyPosition);
routes.get("/position-cand",Controller.viewPositionCand);
routes.get("/get-position-cand", Controller.GetPosCandPage);
routes.post("/get-pos", Controller.getPosition);
routes.get("/edit-pos-page", Controller.editPositionPage);
routes.post("/edit-pos", Controller.editPosition);
export default routes;
