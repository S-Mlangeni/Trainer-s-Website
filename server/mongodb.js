const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

//Connecting to mongodb:
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }); /* Note
that if the specified db is not present,it will be created. */
mongoose.connection.once("open", function() {
    console.log("DB connection is successful.");
}).on("error", function(error) {
    console.log("DB connection error: ", error);
})

//Creating Schema(layout) and model(table/collection) for the db:
const ourSchema = mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const ourModel = mongoose.model("traineeData", ourSchema);

const ourMongoDB = (req, res) => {
    console.log(req.body);
    const entry = new ourModel(req.body);
    /*const entry = new ourModel({
        name: "Jan",
        email: "Jan@gmail.com",
        message: "Yo, what's up. It's Jan."
    });*/
    
    entry.save()
    .then(function() {
        console.log("DB entry is successful.");
        res.send({
            status: "Data entry is successful.",
            outcome: true
        })
    })
    .catch((error) => {
        console.log("DB entry error: ", error);
        res.send({
            status: "Data entry is Unsuccessful!",
            outcome: false
        })
    }); // then() is used to handle the asynchronous method "save()".
    
}

module.exports = {
    ourMongoDB
};