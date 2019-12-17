import { Router } from "express";
import Controller from "../controllers/controller";
const routes = Router();

routes.get("/", Controller.init);
routes.get("/login-hr", Controller.loginHR);
router.get('/login-hr', function(req , res , next){
    req.session.favColor = 'Red';
    res.send('Setting favourite color ...!');
});

router.get('/getColor', function(req , res , next){
    res.send('Favourite Color : ' + (req.session.favColor == undefined?"NOT FOUND":req.session.favColor));
});
routes.get("/home-page",Controller.viewHomePage);
routes.get("/positions",Controller.viewPositions);
routes.post("/get-hr", Controller.getHR);
routes.get("/get-all-hr", Controller.getAllHR);
export default routes;
