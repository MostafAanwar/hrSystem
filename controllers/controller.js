import model from "../model/model.js";
const nodemailer = require("nodemailer");
const Path = require("path");
var fs = require("fs");

class Controller {
    init(req, res) {
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
    signUp(req, res){
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
    userHomePage(req, res){
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


    getUser(req, res){
        let username = req.body.username;
        let password = req.body.password;
        model.getUser(username, password).then((response) => { //response contains returned data
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
    getHR(req, res) {
        let username = req.body.username;
        let password = req.body.password;
        model.getHR(username, password).then((response) => { //response contains returned data
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
    getAllHR(req, res) {
        model.getAllHR().then((response) => { //response contains returned data
            res.contentType('json');
            console.log(response.result);
            res.send(response.result);
            return response.connection; //returned on next then
        }).then((con) => {
            model.disconnect(con); //TODO
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
            model.disconnect(con); //TODO
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
    addPosition(req, res){
        let title = req.body.title;
        let available = req.body.available;
        if(available === ""){
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
    getPosition(req, res) {
        let PID = req.body.PID;
        model.getPosition(PID).then((response) => {
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
    editPosition(req, res){
        let PID = req.body.PID;
        let title = req.body.title;
        let description = req.body.description;
        let salary = req.body.salary;
        let available = req.body.available;
        if(available === 'true'){
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
            model.disconnect(con); //TODO
        }).catch((err) => {
            return console.error("Error! " + err.message);
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
            to: 'linamuhab@gmail.com',
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


}

const mainController = new Controller();
export default mainController;

