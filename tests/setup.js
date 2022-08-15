require('../models/User')
const mongoose = require('mongoose')
const keys = require('../config/keys')

mongoose.Promise = global.Promise
mongoose 
 .connect(keys.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,   })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));
