import { Router } from "express";
import Controller from "../controllers/controller";
const routes = Router();

//Page links
routes.get("/", Controller.init);
routes.get("/login-hr", Controller.loginHR);
routes.get("/sign-up", Controller.signUp);
routes.get("/home-page",Controller.userHomePage);
routes.get("/hr-index", Controller.HRHomePage);
routes.get("/get-positions", Controller.GetPositionPage); //TODO change it to get-positions page and find all instances of that link and change it
routes.get("/add-pos-page", Controller.addPositionPage);
routes.get("/edit-pos-page", Controller.editPositionPage);
routes.get("/registerees-page", Controller.getRegistereePage);



//Data/functions
routes.get("/positions",Controller.viewPositions);
routes.post("/get-hr", Controller.getHR);
routes.post('/get-user', Controller.getUser);
routes.get("/get-all-hr", Controller.getAllHR);
routes.post("/delete-pos",Controller.deletePosition);
routes.post("/add-pos", Controller.addPosition);
routes.post("/get-pos", Controller.getPosition);
routes.post("/edit-pos", Controller.editPosition);
routes.get("/get-reg", Controller.getRegisterees);
routes.post("/alter-approval", Controller.alterApproval);
routes.get("/send-mail", Controller.sendEmail);
export default routes;