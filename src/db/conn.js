const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/e-comm", {
    // useCreateIndex: true,
    // useNewUrlParser: true,
    // useUnifieldTopology: true

}).then(() => {
    console.log("Connection is successful");
}).catch((e) => {
    console.log("No connection")
})