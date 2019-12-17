import { Router } from "express";
import Controller from "../controllers/controller";
const routes = Router();

routes.get("/", Controller.init);
routes.get("/login-hr", Controller.loginHR);
// routes.get('/login-hr', function(req , res , next){
//     req.session.favColor = 'Red';
//     res.send('Setting favourite color ...!');
// });
//
// routes.get('/getColor', function(req , res , next){
//     res.send('Favourite Color : ' + (req.session.favColor == undefined?"NOT FOUND":req.session.favColor));
// });
routes.get("/home-page",Controller.userHomePage);
routes.get("/hr-index", Controller.HRHomePage);
routes.get("/positions",Controller.viewPositions);
routes.post("/get-hr", Controller.getHR);
routes.post('/get-user', Controller.getUser);
routes.get("/get-all-hr", Controller.getAllHR);
export default routes;
