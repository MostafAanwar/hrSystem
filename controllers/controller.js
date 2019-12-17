import model from "../model/model.js";

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


    getHR(req, res) {
        model.getHR().then((response) => { //response contains returned data
            res.contentType('json');
            console.log(response.result);
            res.send(response.result);
            return response.connection; //returned on next then
        }).then((con) => {
            model.disconnect(con);
        }).catch((err) => {
            return console.error("Error: " + err.message);
        });
    }

    getAllPositions(req, res) {
        console.log("controller");
        model.getPositions().then((response) => { //response contains returned data
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

    getAllHR(req, res) {
        console.log("controller");
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


}

const mainController = new Controller();
export default mainController;
