import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/index";
const http = require("http");
const cors = require("cors");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const multer = require('multer');
// This line is from the Node.js HTTPS documentation.
// var options = {};

const app = express();

app.use(fileUpload({
    createParentPath: true
}));

// upload file path
const FILE_PATH = 'CV';

// configure multer
const upload = multer({
    dest: `${FILE_PATH}/`
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true})); //CHANGED VALUE


app.use(cookieParser());
app.use(cors());
app.use(session({secret: 'sessionID'}));
// Configure app to user bodyParser & the routes

app.use("/", routes);
app.use(express.static("views"));
// app.use(fileUpload({
//     createParentPath: true
// }));

// create a server using port 3000
const PORT = process.env.PORT || 3000;
http.createServer(app).listen(PORT, () => {
  console.log("server is running on port " + PORT);
});
