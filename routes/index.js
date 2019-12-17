import { Router } from "express";
import Controller from "../controllers/controller";
const routes = Router();

routes.get("/", Controller.init);
routes.get("/loginhr", Controller.loginHR);
router.get('/loginhr', function(req , res , next){
    req.session.favColor = 'Red';
    res.send('Setting favourite color ...!');
});

router.get('/getColor', function(req , res , next){
    res.send('Favourite Color : ' + (req.session.favColor == undefined?"NOT FOUND":req.session.favColor));
});
routes.get("/homePage",Controller.viewHomePage);
routes.get("/Positions",Controller.viewPositions);
routes.post("/getHR", Controller.getHR);
routes.get("/getAllHR", Controller.getAllHR);
export default routes;
