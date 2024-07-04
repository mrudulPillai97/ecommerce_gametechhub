const mongoose = require("mongoose");

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI, connectionParams).then((data) => {
        console.log(`Database connected with server: ${data.connection.host}`);
    }).catch((err) => {
        console.log(err);
    })
}

module.exports = connectDatabase;