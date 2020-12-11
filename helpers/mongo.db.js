// jshint esversion: 6
const mongoose = require('mongoose');

// mongoose.Promise = global.Promise;
const mongoPort = process.env.MONGO_URI_HOST_PORT;
// mongoPort || 
mongoose.connect('mongodb://localhost:27017/Delivr', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.');
    } else {
        console.log('Error in DB connection: ' + err);
    }
});

// module.exports()
