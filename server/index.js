const app = require("./app")
require('dotenv').config();
const connectDB = require('./app/db/config');

connectDB(); // connect to the db

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is up and running on port: ${PORT}`);
})