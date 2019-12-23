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
routes.get("/examinees-page", Controller.getExamineesPage);
routes.get("/report-page",Controller.getReportPage);
routes.get("/get-exam", Controller.getExamPage);
routes.get("/view-test", Controller.viewTestPage);
routes.get("/success", Controller.viewEndPage);
routes.get("/tests", Controller.viewAllTestsPage);
routes.get("/test-details", Controller.viewDetailsPage);

//Data
routes.post("/session", Controller.getSession);
routes.get("/positions",Controller.viewPositions);
routes.post("/get-hr", Controller.getHR);
routes.post('/get-user', Controller.getUser);
routes.get("/get-all-hr", Controller.getAllHR);
routes.post("/delete-pos",Controller.deletePosition);
routes.post("/add-pos", Controller.addPosition);
routes.post("/apply-pos", Controller.applyPosition);
routes.get("/position-cand",Controller.viewPositionCand);
routes.get("/get-position-cand", Controller.GetPosCandPage);
routes.post("/get-pos", Controller.getPosition);
routes.post("/edit-pos", Controller.editPosition);
routes.post("/detailed-tests", Controller.getDetailedTests);
routes.get("/get-reg", Controller.getRegisterees);
routes.post("/alter-approval", Controller.alterApproval);
routes.get("/get-app", Controller.getApplicants);
routes.get("/view-examinees", Controller.getExaminees);
routes.post("/exam", Controller.viewTests);
routes.get("/all-tests", Controller.getAllTests);
routes.post("/delete-test", Controller.deleteTest);
routes.post("/get-all-questions", Controller.getAllQuestions);
routes.post("/get-all-answers", Controller.getAllAnswers);
routes.post("/test-type", Controller.getTestType);
routes.post("/test-page" ,Controller.getQuestions);
routes.post("/test-page-c-answer", Controller.getCAnswer);
routes.post("/test-page-f-answers", Controller.getFAnswers);
routes.post("/save-answer", Controller.saveAnswer);
routes.post("/save-score", Controller.saveTestScore);



//functions
routes.get("/send-mail", Controller.sendEmail);
routes.get("/get-cv", Controller.viewCV);





export default routes;
