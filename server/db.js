const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

//Creating a mysql connection:
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
})

//Connecting with mysql db:
connection.connect((error) => { //Call-back function is used to monitor the connection to the db.
    if(error) {
        console.error(error);
    } else {
        console.log ("DB connection is successful.")
    }
})

const mysqldb = (req, res) => {

    // Inserting data using sql queries:
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    
    const entry = `INSERT INTO clientmessage (name, email, message) VALUES ( "${name}", "${email}", "${message}")`;
    connection.query(entry, (error) => {
        if (error) {
            console.error(error);
            res.send({
                status: "Data entry is Unsuccessful!",
                outcome: false
            })

        } else {
            console.log("Data row is successfully added.")
            res.send({
                status: "Data entry is successful.",
                outcome: true
            })
        }
    })

}

module.exports = {
    mysqldb
}