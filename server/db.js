const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();
const request = require("request");

//Creating a mysql connection:
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
})


function handleDisconnect() {
    //Creating a mysql connection:
    const connection = mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DB,
    })  // Recreates the connection, since the old one cannot be reused after disconnecting
    
    //Connecting with mysql db:
    connection.connect((err) => { //Call-back function is used to monitor the connection to the db.           
        // The server is either down or restarting (takes a while sometimes).
        if(err) {                                   
            console.log ("An error has occurred connecting to DB.");
            console.error(error);
            setTimeout(handleDisconnect, 2000); /* We introduce a delay before attempting to reconnect,
            to avoid a hot loop, and to allow our node script to process asynchronous requests in the 
            meantime. If you're also serving http, display a 503 error. */
        } else {
            console.log ("DB connection is successful.")
        }                                    
    });                                     
    
    //Handling lost connection with mysql db server:
    connection.on('error', function(err) {
      console.log('DB connection is lost.', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
        handleDisconnect();                         // lost due to either the server restart, or a
      } else {                                      // connnection idle timeout (the wait_timeout
        throw err;                                  // server variable configures this).
      }
    });
  }
  
  handleDisconnect();



//Connecting with mysql db:
//connection.connect((error) => { //Call-back function is used to monitor the connection to the db.
   /* if(error) {
        console.log ("An error has occurred connecting to DB.")
        console.error(error);
    } else {
        console.log ("DB connection is successful.")
    }
})*/

const mysqldb = (req, res) => {
    /* The request function below is necessary to allow incoming requests from the specified
    urls/domains, thus eliminating "cors" and "POST/GET" errors when hosting */
    request(
        { url: process.env.URL },
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
              return res.status(500).json({ type: 'error', message: err.message });
            }
        }
    )

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