const express = require("express");
const cors = require("cors");
const dbController = require("./db") // "database" file in current/same directory/folder

const ex_app = express();

ex_app.listen(process.env.PORT, () => {
    console.log("Server is running");
});

ex_app.use(cors()); /* Middleware that activates the "cors" function to allow the client-side
.js file to access the server side. Otherwise, file will be denied access to the server side
by the browser. */ 
ex_app.use(express.json()); /* Middleware to help server read the posted/incomming data 
in json format. Otherwise, requested data will result in an "undefined" result. */

ex_app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // "*" allows all domains to access the server
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  }); /* Middleware that allows different domains to access the server, thus eliminating cors error */

ex_app.post("/", dbController.mysqldb);

ex_app.get("/", (req, res) => {
    res.send("<h1>Hello</h1>")
});