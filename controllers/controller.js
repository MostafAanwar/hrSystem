import model from "../model/model.js";

const Path = require("path");
var fs = require("fs");
const json2html = require('node-json2html');


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
            let transform = {'<>': 'div', 'text': '${name} ${available} ${description} ${salary}'};
            let html = json2html.transform(response.result, transform);
            res.send(html);
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
