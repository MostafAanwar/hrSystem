import { Router } from "express";
import Controller from "../controllers/controller";
const routes = Router();

//Page links
routes.get("/", Controller.init);
routes.get("/login-hr", Controller.loginHR);
routes.get("/sign-up", Controller.signUp);
routes.get("/home-page",Controller.userHomePage);
routes.get("/hr-index", Controller.HRHomePage);
routes.get("/get-positions", Controller.GetPositionPage);
routes.get("/add-pos-page", Controller.addPositionPage);
routes.get("/edit-pos-page", Controller.editPositionPage);
routes.get("/registerees-page", Controller.getRegistereePage);
routes.get('/applicants-page', Controller.getApplicantPage);
routes.get("/create-exam-page", Controller.getCreateExamPage);

routes.get("/get-exam", Controller.getExamPage);
routes.get("/view-test", Controller.viewTestPage);
routes.get("/success", Controller.viewEndPage);
routes.get("/get-position-cand", Controller.GetPosCandPage);

//Data
routes.get("/positions",Controller.viewPositions);
routes.post("/get-hr", Controller.getHR);
routes.post('/get-user', Controller.getUser);
routes.get("/get-all-hr", Controller.getAllHR);
routes.post("/delete-pos",Controller.deletePosition);
routes.post("/add-pos", Controller.addPosition);
routes.post("/apply-pos", Controller.applyPosition);
routes.get("/position-cand",Controller.viewPositionCand);

routes.post("/get-pos", Controller.getPosition);
routes.post("/edit-pos", Controller.editPosition);

routes.get("/get-reg", Controller.getRegisterees);
routes.post("/alter-approval", Controller.alterApproval);
routes.get("/get-app", Controller.getApplicants);
routes.get("/get-test-types", Controller.getTestTypes);

routes.post("/exam", Controller.viewTests);
routes.post("/test-type", Controller.getTestType);
routes.post("/test-page" ,Controller.getQuestions);
routes.post("/test-page-c-answer", Controller.getCAnswer);
routes.post("/test-page-f-answers", Controller.getFAnswers);
routes.post("/save-answer", Controller.saveAnswer);
routes.post("/save-score", Controller.saveTestScore);
routes.post("/create-exam", Controller.createExam);
routes.post("/add-user", Controller.addUser);
routes.post("/user-exist", Controller.isSignedUp);


//functions
routes.get("/send-mail", Controller.sendEmail);
routes.get("/get-cv", Controller.viewCV);
routes.post("/upload-cv", Controller.uploadCV);
routes.post("/add-cv-path", Controller.addCVPath)


export default routes;
