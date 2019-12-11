import model from "../model/model.js";
const Path = require("path");
var fs = require("fs");

class Controller {
  init(req, res) {
    let path = Path.join(__dirname, "../views/index.html");
    fs.readFile(path, function(err, html) {
      if (err) {
        throw err;
      }
      res.writeHeader(200, { "Content-Type": "text/html" });
      res.write(html);
      res.end();
    });
  }

  getAllUsers(req, res) {
    let users = model.getAllUsers();
    if (users) {
      res.status(200).send({
        users: users
      });
    }
  }
}
const mainController = new Controller();
export default mainController;
