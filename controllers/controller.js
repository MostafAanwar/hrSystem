import model from "../model/model.js";
const nodemailer = require("nodemailer");
const Path = require("path");
var fs = require("fs");
var http = require('http');
var mime = require('mime');
class Controller {
    init(req, res) {
        if(req.session.username){
            res.redirect('/home-page');
        }
        if(req.session.name){
            res.redirect('/hr-index');
        }
        let path = Path.join(__dirname, "../views/index.html");
        fs.readFile(path, function (err, html) {
            if (err) {
                throw err;
            }
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(html);
            res.end();
        });
    }
    getSession(req,res){
        res.contentType('json');
        let stringResult = JSON.stringify(req.session);
        let jsonResult = JSON.parse(stringResult);
        res.send(jsonResult);
    }
    loginHR(req, res) {
        let path = Path.join(__dirname, "../views/hrlogin.html");
        fs.readFile(path, function (err, html) {
            if (err) {
                throw err;
            }
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(html);
            res.end();
        });
    }

    signUp(req, res) {
        let path = Path.join(__dirname, "../views/signup.html");
        fs.readFile(path, function (err, html) {
            if (err) {
                throw err;
            }
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(html);
            res.end();
        });
    }

    userHomePage(req, res) {
        let path = Path.join(__dirname, "../views/userhome.html");
        fs.readFile(path, function (err, html) {
            if (err) {
                throw err;
            }
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(html);
            res.end();
        });
    }
    HRHomePage(req, res) {
        let path = Path.join(__dirname, "../views/HRIndex.html");
        fs.readFile(path, function (err, html) {
            if (err) {
                throw err;
            }
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(html);
            res.end();
        });
    }
    GetPositionPage(req, res){
        let path = Path.join(__dirname, "../views/positions.html");
        fs.readFile(path, function (err, html) {
            if (err) {
                throw err;
            }
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(html);
            res.end();
        });
    }
    viewAllTestsPage(req,res){
        let path = Path.join(__dirname, "../views/all-tests.html");
        fs.readFile(path, function (err, html) {
            if (err) {
                throw err;
            }
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(html);
            res.end();
        });
    }
    addPositionPage(req, res) {
        let path = Path.join(__dirname, "../views/add-position.html");
        fs.readFile(path, function (err, html) {
            if (err) {
                throw err;
            }
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(html);
            res.end();
        });
    }
    editPositionPage(req, res) {
        let path = Path.join(__dirname, "../views/edit-position.html");
        fs.readFile(path, function (err, html) {
            if (err) {
                throw err;
            }
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(html);
            res.end();
        });
    }
    getRegistereePage(req,res){
        let path = Path.join(__dirname, "../views/registerees-page.html");
        fs.readFile(path, function (err, html) {
            if (err) {
                throw err;
            }
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(html);
            res.end();
        });
    }
    getApplicantPage(req, res){
        let path = Path.join(__dirname, "../views/applicants-page.html");
        fs.readFile(path, function (err, html) {
            if (err) {
                throw err;
            }
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(html);
            res.end();
        });
    }
    getCreateExamPage(req, res){
        let path = Path.join(__dirname, "../views/create-exam-page.html");
        fs.readFile(path, function (err, html) {
            if (err) {
                throw err;
            }
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(html);
            res.end();
        });
    }
    getReportPage(req,res){
        let path = Path.join(__dirname, "../views/report.html");
        fs.readFile(path, function (err, html) {
            if (err) {
                throw err;
            }
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(html);
            res.end();
        });
    }
    GetPosCandPage(req, res) {
        let path = Path.join(__dirname, "../views/PositionsCand.html");
        fs.readFile(path, function (err, html) {
            if (err) {
                throw err;
            }
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(html);
            res.end();
        });
    }
    GetPositionPage(req, res) {
        let path = Path.join(__dirname, "../views/positions.html");
        fs.readFile(path, function (err, html) {
            if (err) {
                throw err;
            }
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(html);
            res.end();
        });
    }
    getExamineesPage(req, res) {
        let path = Path.join(__dirname, "../views/examinees-page.html");
        fs.readFile(path, function (err, html) {
            if (err) {
                throw err;
            }
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(html);
            res.end();
        });
    }

    getUser(req, res) {
        let username = req.body.username;
        req.session.email = req.body.username;
        let password = req.body.password;
        model.getUser(username, password).then((response) => { //response contains returned data
            res.contentType('json');
            let stringResult = JSON.stringify(response.result);
            let jsonResult = JSON.parse(stringResult);
            req.session.username = jsonResult[0]['username'];
            res.send(jsonResult);
            return response.connection; //returned on next then
        }).then((con) => {
            model.disconnect(con);
        }).catch((err) => {
            return console.error("Error: " + err.message);
        });
    }
    getHR(req, res) {
        let username = req.body.username;
        req.session.email = req.body.username;
        let password = req.body.password;
        model.getHR(username, password).then((response) => { //response contains returned data
            res.contentType('json');
            let stringResult = JSON.stringify(response.result);
            let jsonResult = JSON.parse(stringResult);
            req.session.name = jsonResult[0]['name'];
            res.send(jsonResult);
            return response.connection; //returned on next then
        }).then((con) => {
            model.disconnect(con);
        }).catch((err) => {
            return console.error("Error: " + err.message);
        });
    }
    getAllHR(req, res) {
        model.getAllHR().then((response) => { //response contains returned data
            res.contentType('json');
            console.log(response.result);
            res.send(response.result);
            return response.connection; //returned on next then
        }).then((con) => {
            model.disconnect(con);
        }).catch((err) => {
            return console.error("Error! " + err.message);
        });
    }
    
    viewPositions(req, res) {
        model.viewPositions().then((response) => {
            res.contentType('json');
            res.send({
                data: response.result
            });
            return response.connection; //returned on next then
        }).then((con) => {
            model.disconnect(con); 
        }).catch((err) => {
            return console.error("Error! " + err.message);
        });
    }

    getPosition(req, res) {
        let PID = req.body.PID;
        model.getPosition(PID).then((response) => {
            res.contentType('json');
            let stringResult = JSON.stringify(response.result);
            let jsonResult = JSON.parse(stringResult);
            res.send(jsonResult);
            return response.connection; //returned on next then
        }).then((con) => {
            model.disconnect(con); 
        }).catch((err) => {
            return console.error("Error! " + err.message);
        });
    }
    deletePosition(req, res) {
        let PID = req.body.PID;
        model.deletePosition(PID).then((response) => {
            res.contentType('json');
            let stringResult = JSON.stringify(response.result);
            let jsonResult = JSON.parse(stringResult);
            res.send(jsonResult);
            return response.connection; //returned on next then
        }).then((con) => {
            model.disconnect(con); //TODO
        }).catch((err) => {
            return console.error("Error! " + err.message);
        });
    }

    editPosition(req, res) {
        let PID = req.body.PID;
        let title = req.body.title;
        let description = req.body.description;
        let salary = req.body.salary;
        let available = req.body.available;
        if (available === 'true') {
            available = '1';
        }
        else {
            available = '0';
        }
        model.editPosition(PID, title, available, description, salary).then((response) => {
            res.contentType('json');
            console.log(response.result);
            let stringResult = JSON.stringify(response.result);
            let jsonResult = JSON.parse(stringResult);
            res.send(jsonResult);

            return response.connection; //returned on next then
        }).then((con) => {
            model.disconnect(con);
        }).catch((err) => {
            return console.error("Error! " + err.message);
        });
    }

    addPosition(req, res) {
        let title = req.body.title;
        let available = req.body.available;
        if (available === "") {
            available = 0;
        }
        let description = req.body.description;
        let salary = req.body.salary;
        model.addPosition(title, available, description, salary).then((response) => {

            res.contentType('json');
            let stringResult = JSON.stringify(response.result);
            let jsonResult = JSON.parse(stringResult);
            res.send(jsonResult);
            return response.connection; //returned on next then
        }).then((con) => {
            model.disconnect(con); //TODO
        }).catch((err) => {
            return console.error("Error! " + err.message);
        });
    }


    applyPosition(req, res) {
        let PID = req.body.PID;
        let username = req.body.username;
        model.savePosition(PID, username).then((response) => {
            res.contentType('json');
            let stringResult = JSON.stringify(response.result);
            let jsonResult = JSON.parse(stringResult);
            res.send(jsonResult);
            return response.connection; //returned on next then
        }).then((con) => {
            model.disconnect(con); //TODO
        }).catch((err) => {
            return console.error("Error! " + err.message);
        });
    }

    viewPositionCand(req, res) {
        model.viewPositionCand().then((response) => {
            res.contentType('json');
            res.send({
                data: response.result
            });
            return response.connection; //returned on next then
        }).then((con) => {
            model.disconnect(con); //TODO
        }).catch((err) => {
            return console.error("Error! " + err.message);
        });
    }

    getRegisterees(req,res){
        model.getRegisterees().then((response) => {
            res.contentType('json');
            res.send({
                data: response.result
            });
            return response.connection; //returned on next then
        }).then((con) => {
            model.disconnect(con); //TODO
        }).catch((err) => {
            return console.error("Error! " + err.message);
        });
    }
    alterApproval(req,res){
        console.log("hi");
        let len = Object.keys(req.body).length;
        let str = JSON.stringify(req.body);
        model.alterApproval(str, len).then((response) => {
            res.contentType('json');
            res.send({
                data: response.result
            });
            return response.connection; //returned on next then
        }).then((con) => {
            model.disconnect(con); //TODO
        }).catch((err) => {
            return console.error("Error! " + err.message);
        });
    }
    getApplicants(req, res){
        model.getApplicants().then((response) => {
            res.contentType('json');
            res.send({
                data: response.result
            });
            return response.connection; //returned on next then
        }).then((con) => {
            model.disconnect(con); //TODO
        }).catch((err) => {
            return console.error("Error! " + err.message);
        });
    }
    getExaminees(req, res){
        model.getExaminees().then((response) => {
            res.contentType('json');
            res.send({
                data: response.result
            });
            return response.connection; //returned on next then
        }).then((con) => {
            model.disconnect(con); //TODO
        }).catch((err) => {
            return console.error("Error! " + err.message);
        });
    }
    getDetailedTests(req,res){
        let C_email = req.body.email;
        console.log("testing");
        model.getDetailedTests(C_email).then((response) => {
            console.log(response.result);
            res.contentType('json');
            let stringResult = JSON.stringify(response.result);
            let jsonResult = JSON.parse(stringResult);
            res.send(jsonResult);
            return response.connection; //returned on next then
        }).then((con) => {
            model.disconnect(con);
        }).catch((err) => {
            return console.error("Error: " + err.message);
        });
    }



    sendEmail(req, res){

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth:{
                user: 'exam.mailer19@gmail.com',
                pass: 'ctSp<~t4LQ}`_E-)'
            }
        });
        let message = {
            from: 'exam.mailer19@gmail.com',
            to: '', //TODO get user/hr email
            subject: "Examination Link",
            html: "<p>Please follow the link below to take your exam.</p>" +
                "<p>Clicking the link will not automatically start your exam.</p>" +
                "Click <a href='http://localhost:3000/'>here</a> to take your exam"
        };
        transporter.sendMail(message, function (err, info) {
            if(err){
                console.log(err);
                transporter.close();
            }
            else {
                console.log("Message sent!");
                console.log(info);
                transporter.close();
            }
        });
    }

    viewCV(req, res){
        let reqURL = req.url;
        let relPath = reqURL.substr(reqURL.lastIndexOf('=') + 1);
        let fileName = relPath.substr(relPath.lastIndexOf('/') + 1);
        let path = Path.join(__dirname, "../" + relPath);

        if(path.indexOf('%20') >= 0){
            path = decodeURIComponent(path);
        }

        console.log(path);
        let mimetype = mime.lookup(fileName);
        res.setHeader('Content-disposition', 'attachment; filename=' + fileName);
        res.setHeader('Content-type', mimetype);
        res.download(path,fileName, function (err) {
            if(err) console.log(err.message);

        });
    }


    getExamPage(req, res) {
        let path = Path.join(__dirname, "../views/exam-page.html");
        fs.readFile(path, function (err, html) {
            if (err) {
                throw err;
            }
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(html);
            res.end();
        });
    }
    viewTests(req,res){
        model.viewTests().then((response) => {
            res.contentType('json');
            res.send({
                data: response.result
            });
            return response.connection; //returned on next then
        }).then((con) => {
            model.disconnect(con); //TODO
        }).catch((err) => {
            return console.error("Error! " + err.message);
        });
    }
    getAllTests(req,res){
        model.getAllTests().then((response) => {
            res.contentType('json');
            res.send({
                data: response.result
            });
            return response.connection; //returned on next then
        }).then((con) => {
            model.disconnect(con); //TODO
        }).catch((err) => {
            return console.error("Error! " + err.message);
        });
    }

    deleteTest(req,res){
        let TID = req.body.TID;
        model.deleteTest(TID).then((response) => {
            res.contentType('json');
            let stringResult = JSON.stringify(response.result);
            let jsonResult = JSON.parse(stringResult);
            res.send(jsonResult);
            return response.connection; //returned on next then
        }).then((con) => {
            model.disconnect(con); //TODO
        }).catch((err) => {
            return console.error("Error! " + err.message);
        });
    }
    getQuestions(req, res){
        let test_id = req.body.TID;
        console.log(test_id);
        console.log("testing");
        model.getQuestions(test_id).then((response) => {
            console.log(response.result);
            res.contentType('json');
            let stringResult = JSON.stringify(response.result);
            let jsonResult = JSON.parse(stringResult);
            res.send(jsonResult);
            return response.connection; //returned on next then
        }).then((con) => {
            model.disconnect(con);
        }).catch((err) => {
            return console.error("Error: " + err.message);
        });
    }
    getTestType(req,res){
            let test_id = req.body.TID;
            console.log(test_id);
            console.log("testing");
            model.getTestType(test_id).then((response) => {
                console.log(response.result);
                res.contentType('json');
                let stringResult = JSON.stringify(response.result);
                let jsonResult = JSON.parse(stringResult);
                res.send(jsonResult);
                return response.connection; //returned on next then
            }).then((con) => {
                model.disconnect(con);
            }).catch((err) => {
                return console.error("Error: " + err.message);
            });
    }

    getCAnswer(req, res){
        let qid = req.body.QID;
        model.getCAnswer(qid).then((response) => { //response contains returned data
            res.contentType('json');
            let stringResult = JSON.stringify(response.result);
            let jsonResult = JSON.parse(stringResult);
            console.log("anssss")
            console.log(jsonResult)
            res.send(jsonResult);
            return response.connection;
        }).then((con) => {
            model.disconnect(con);
        }).catch((err) => {
            return console.error("Error: " + err.message);
        });
    }
    getFAnswers(req, res){
        let qid = req.body.QID;
        model.getFAnswers(qid).then((response) => { //response contains returned data
            res.contentType('json');
            let stringResult = JSON.stringify(response.result);
            let jsonResult = JSON.parse(stringResult);
            console.log("anssss")
            console.log(jsonResult)
            res.send(jsonResult);
            return response.connection;
        }).then((con) => {
            model.disconnect(con);
        }).catch((err) => {
            return console.error("Error: " + err.message);
        });
    }
    viewTestPage(req,res) {

        let path = Path.join(__dirname, "../views/test.html");
        fs.readFile(path, function (err, html) {
            if (err) {
                throw err;
            }
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(html);
            res.end();
        });
    }
    saveAnswer(req,res){
        let AID = req.body.AID;
        let QID = req.body.QID;
        let email = req.body.email;
        console.log("testing");
        model.saveAnswer(AID,QID,email).then((response) => {
            console.log(response.result);
            console.log("GWA");
            res.contentType('json');
            let stringResult = JSON.stringify(response.result);
            let jsonResult = JSON.parse(stringResult);
            res.send(jsonResult);
            return response.connection; //returned on next then
        }).then((con) => {
            model.disconnect(con);
        }).catch((err) => {
            return console.error("Error: " + err.message);
        });
    }
    saveTestScore(req,res){
        let C_email = req.body.email;
        let TID = req.body.TID;
        let test_score = req.body.test_score;
        console.log("testing");
        model.saveTestScore(C_email,TID,test_score).then((response) => {
            console.log(response.result);
            console.log("GWA");
            res.contentType('json');
            let stringResult = JSON.stringify(response.result);
            let jsonResult = JSON.parse(stringResult);
            model.saveTotalScore(C_email,test_score).then((response1) =>{
            });
            res.send(jsonResult);
            return response.connection; //returned on next then
        }).then((con) => {
            model.disconnect(con);
        }).catch((err) => {
            return console.error("Error: " + err.message);
        });
    }
    viewEndPage(req,res){
        let path = Path.join(__dirname, "../views/thank-you.html");
        fs.readFile(path, function (err, html) {
            if (err) {
                throw err;
            }
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(html);
            res.end();
        });
    }
}
const mainController = new Controller();
export default mainController;

