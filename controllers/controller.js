import model from "../model/model.js";
const nodemailer = require("nodemailer");
const Path = require("path");
let fs = require("fs");
let http = require('http');
let mime = require('mime');

class Controller {
    init(req, res) {
        if (req.session.username) {
            res.redirect('/home-page');
        }
        if (req.session.name) {
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

    getSession(req, res) {
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

    viewAllTestsPage(req, res) {
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
    addTestPage(req, res) {
        let path = Path.join(__dirname, "../views/add-test-page.html");
        fs.readFile(path, function (err, html) {
            if (err) {
                throw err;
            }
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(html);
            res.end();
        });
    }
    viewDetailsPage(req,res){
        let path = Path.join(__dirname, "../views/test-details.html");
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

    editTestPage(req, res) {
        let path = Path.join(__dirname, "../views/edit-test-page.html");
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

    getReportPage(req, res) {
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
        let email = req.body.email;
        req.session.email = req.body.username;
        let password = req.body.password;
        model.getUser(email, password).then((response) => { //response contains returned data
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
    isSignedUp(req, res) {
        let email = req.body.email;
        model.isSignedUp(email).then((response) => { //response contains returned data
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
        let email = req.body.email;
        req.session.email = req.body.username;
        let password = req.body.password;
        model.getHR(email, password).then((response) => { //response contains returned data
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
    getAllQuestions(req, res) {
        let TID = req.body.TID;
        model.getAllQuestions(TID).then((response) => { //response contains returned data
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
    getAllAnswers(req, res) {
        let QID = req.body.QID;
        model.getAllAnswers(QID).then((response) => {
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
        console.log(req);
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

    editTestType(req, res) {
        let TID = req.body.TID;
        let type = req.body.type;
        console.log(TID);
        console.log(type);

        model.editTestType(TID, type).then((response) => {
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

    addTest(req, res) {
        let type = req.body.type;
        console.log(type);
        model.addTest(type).then((response) => {
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


    applyPosition(req, res) {
        let PID = req.body.PID;
        let email = req.session.email;
        model.savePosition(PID, email).then((response) => {
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
            model.disconnect(con);
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

    getExaminees(req, res) {
        model.getExaminees().then((response) => {
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

    getDetailedTests(req,res){
        let C_email = req.body.email;
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

    getTestTypes(req, res){
        model.getTestTypes().then((response) => {
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
    createExam(req, res){
        let email = req.body.email;
        let checkbox = req.body.checkbox;
        let sequence = req.body.sequence;
        let deadline = req.body.deadline;
        sequence = sequence.filter(item => item);
        model.createExam(checkbox, sequence, email,deadline).then((response) => {
            res.contentType('json');
            res.send({
                data: response.result
            });
            return response.connection; //returned on next then
        }).then((con) => {
            model.disconnect(con);
            mainController.sendEmail(email);

        }).catch((err) => {
            return console.error("Error! " + err.message);
        });
    }
    addUser(req, res){
        let email = req.body.email;
        let name = req.body.name;
        let password = req.body.password;
        let telephone = req.body.telephone;
        if(telephone.length == 0){
            telephone = "-";
        }
        model.addUser(email, name, password, telephone).then((response) => {
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
    addCVPath(req, res){
        let fileName = req.body.filename;
        let path = 'CV/' + fileName;
        console.log(path);
        let email = req.body.email;
        model.addCVPath(path, email).then((response) => {
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

    sendEmail(destination){
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
            to: destination, //TODO get user/hr email
            subject: "Examination Link",
            html: "<p>Please follow the link below to take your exam.</p>" +
                "<p>Clicking the link will not automatically start your exam.</p>" +
                "Click <a href='http://localhost:3000/get-exam'>here</a> to take your exam"
        };
        console.log("mess" + message);
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
    uploadCV(req,res){
        try {
            if(!req.files) {
                res.send({
                    status: false,
                    message: 'No file uploaded'
                });
            } else {
                //Use the name of the input field (i.e. "upload") to retrieve the uploaded file
                let upload = req.files.upload;

                //Use the mv() method to place the file in upload directory (i.e. "uploads")
                upload.mv('./CV/' + upload.name);

                //send response
                res.send({
                    status: true,
                    message: 'File is uploaded',
                    data: {
                        name: upload.name,
                        mimetype: upload.mimetype,
                        size: upload.size
                    }
                });
            }
        } catch (err) {
            res.status(500).send(err);
        }
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
        model.viewTests(req.session.email).then((response) => {
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

    getAllTests(req, res) {
        model.getAllTests().then((response) => {
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

    deleteTest(req, res) {
        let TID = req.body.TID;
        model.deleteTest(TID).then((response) => {
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
    addQuestionPage(req,res){
        let path = Path.join(__dirname, "../views/question-add-page.html");
        fs.readFile(path, function (err, html) {
            if (err) {
                throw err;
            }
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(html);
            res.end();
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
            console.log("anssss");
            console.log(jsonResult);
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
            console.log("anssss");
            console.log(jsonResult);
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
            res.contentType('json');
            let stringResult = JSON.stringify(response.result);
            let jsonResult = JSON.parse(stringResult);
            model.saveTotalScore(C_email, test_score).then((response1) => {
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
    addQuestion(req,res){
        let text = req.body.text;
        let TID = req.body.TID;
        model.addQuestion(text, TID).then((response) => {
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
    deleteQuestion(req,res) {
        let QID = req.body.QID;
        model.deleteQuestion(QID).then((response) => {
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
    deleteAnswer(req,res){
        let AID = req.body.AID;
        model.deleteAnswer(AID).then((response) => {
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
    editQuestionPage(req,res){
        let path = Path.join(__dirname, "../views/edit-question.html");
        fs.readFile(path, function (err, html) {
            if (err) {
                throw err;
            }
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(html);
            res.end();
        });
    }
    editQuestion(req,res){
        let QID = req.body.QID;
        let text = req.body.text;
        model.editQuestion(QID,text).then((response) => {
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
    editAnswer(req,res){
        let AID = req.body.AID;
        let textA = req.body.textA;
        let correct = req.body.correct;
        if (correct === 'true') {
            correct = '1';
        }
        else {
            correct = '0';
        }
        model.editAnswer(AID,textA,correct).then((response) => {
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
    getQuestion(req,res){
        let QID = req.body.QID;
        model.getQuestion(QID).then((response) => {
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
    getAnswer(req,res){
        console.log(req);
        let AID = req.body.AID;
        model.getAnswer(AID).then((response) => {
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
    addAnswerPage(req,res){
        let path = Path.join(__dirname, "../views/add-answer-page.html");
        fs.readFile(path, function (err, html) {
            if (err) {
                throw err;
            }
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(html);
            res.end();
        });
    }
    editAnswerPage(req,res){
        let path = Path.join(__dirname, "../views/edit-answer-page.html");
        fs.readFile(path, function (err, html) {
            if (err) {
                throw err;
            }
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(html);
            res.end();
        });
    }

    addAnswer(req,res){
        let textA = req.body.textA;
        let correct = req.body.correct;
        let QID = req.body.QID;
        if (correct === "") {
            correct = 0;
        }
        model.addAnswer(QID,textA,correct).then((response) => {
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
}
const mainController = new Controller();
export default mainController;

