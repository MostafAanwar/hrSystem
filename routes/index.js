import { Router } from "express";
import Controller from "../controllers/controller";
const routes = Router();

routes.get("/", Controller.init);
routes.get("/loginhr", Controller.loginHR);
// router.get('/loginhr', function(req , res , next){
//     req.session.favColor = 'Red';
//     res.send('Setting favourite color ...!');
// });

// router.get('/loginhr', function(req , res , next){
//     res.send('Favourite Color : ' + (req.session.favColor == undefined?"NOT FOUND":req.session.favColor));
// });
routes.get("/homePage",Controller.HRHomePage);
routes.get("/positionsPage",Controller.GetPositionPage);
routes.get("/positions",Controller.viewPositions);
routes.post("/getHR", Controller.getHR);
routes.get("/getAllHR", Controller.getAllHR);
export default routes;
