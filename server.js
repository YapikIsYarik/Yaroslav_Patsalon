const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const appPort = 4004;
const mongoUrl = "mongodb+srv://admin:22032002@cluster0.s2vvgpk.mongodb.net/?retryWrites=true&w=majority"

const app = express();
app.use(bodyParser.json());
app.use(cors());

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}


const UserSchema = new mongoose.Schema(
    {
        name: String,
        nickname: String,
        imgUrl: String,

    }
)

mongoose.model("Users", UserSchema)
const Users = mongoose.model("Users")


//Controller

const getAllUsers = ( req, res ) => {
    Users.find()
        .exec()
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err))
}

const createUsers = ( req, res ) => {
    Users.create(req.body)
        .then(createUsers => res.json(createUsers))
        .catch(err => res.status(500).json(err))

}



// Routes

app.get('/users', cors(corsOptions), getAllUsers)
app.post('/addUser', cors(corsOptions), createUsers)


mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(
        appPort,
        () => console.log(`Listening on port ${ appPort } ...`)
    ))
    .catch(err => console.error(`Error connecting to mongo: ${ mongoUrl }`, err))