import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/index";
var http = require("http");
var cors = require("cors");
let cookieParser = require('cookie-parser');
// This line is from the Node.js HTTPS documentation.
// var options = {};

const app = express();
app.use(cookieParser());
app.use(cors());
// app.use(session({secret:config.sessionSecret,saveUninitialized:true, resave:true}));
// Configure app to user bodyParser & the routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", routes);
app.use(express.static("views"));

// create a server using port 3000
const PORT = process.env.PORT || 3000;
http.createServer(app).listen(PORT, () => {
  console.log("server is running on port " + PORT);
});
