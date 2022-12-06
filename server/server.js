
var express = require('express');
var cors = require('cors')

var app = express();
app.use(cors())

var port = process.env.PORT || 3000;
var mongoose = require('mongoose');

require('./api/models/usersModel');
require('./api/models/excerciseModel');
require('./api/models/commentModel');

var bodyParser = require('body-parser');

mongoose.Promise = global.Promise;

const url = "mongodb+srv://studentz:studentz@cluster0.qxb6w.mongodb.net/workoutapp?retryWrites=true&w=majority";

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(url, connectionParams)
    .then(() => {
        console.log('Connected to database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/appRoutes');

routes(app);

app.listen(port);
console.log('Server started on: ' + port);