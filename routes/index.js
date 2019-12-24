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
routes.get("/edit-test-page", Controller.editTestPage);
routes.get("/registerees-page", Controller.getRegistereePage);
routes.get('/applicants-page', Controller.getApplicantPage);
routes.get("/create-exam-page", Controller.getCreateExamPage);
routes.get("/examinees-page", Controller.getExamineesPage);
routes.get("/report-page", Controller.getReportPage);
routes.get("/get-exam", Controller.getExamPage);
routes.get("/view-test", Controller.viewTestPage);
routes.get("/success", Controller.viewEndPage);
routes.get("/tests", Controller.viewAllTestsPage);
routes.get("/test-details", Controller.viewDetailsPage);
routes.get("/get-position-cand", Controller.GetPosCandPage);
routes.get("/add-test-page", Controller.addTestPage);


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
routes.post("/edit-test", Controller.editTestType);

routes.post("/get-pos", Controller.getPosition);
routes.post("/edit-pos", Controller.editPosition);
routes.post("/detailed-tests", Controller.getDetailedTests);
routes.get("/get-reg", Controller.getRegisterees);
routes.post("/alter-approval", Controller.alterApproval);
routes.get("/get-app", Controller.getApplicants);
routes.get("/get-test-types", Controller.getTestTypes);

routes.get("/view-examinees", Controller.getExaminees);
routes.post("/exam", Controller.viewTests);
routes.get("/all-tests", Controller.getAllTests);
routes.get("/test-details", Controller.getDetailedTests);
routes.post("/delete-test", Controller.deleteTest);
routes.post("/delete-test", Controller.deleteTest);
routes.post("/get-all-questions", Controller.getAllQuestions);
routes.post("/get-all-answers", Controller.getAllAnswers);
routes.post("/add-question-page", Controller.addQuestionPage);
routes.post("/test-type", Controller.getTestType);
routes.post("/test-page" ,Controller.getQuestions);
routes.post("/test-page-c-answer", Controller.getCAnswer);
routes.post("/test-page-f-answers", Controller.getFAnswers);
routes.post("/save-answer", Controller.saveAnswer);
routes.post("/save-score", Controller.saveTestScore);
routes.post("/create-exam", Controller.createExam);
routes.post("/add-user", Controller.addUser);
routes.post("/user-exist", Controller.isSignedUp);
routes.post("/add-test", Controller.addTest);


//functions
routes.get("/send-mail", Controller.sendEmail);
routes.get("/get-cv", Controller.viewCV);
routes.post("/upload-cv", Controller.uploadCV);
routes.post("/add-cv-path", Controller.addCVPath);


export default routes;
