const mongoose = require('mongoose'); // npm package for easy connection to MongoDB

const connectDB = async () => { // async func to connect to db, needs time
    try { // try to connect to db 
        let dbURI;
        
        if (process.env.NODE_ENV === 'production') { // check to see if the app is on localhost or live dev server
            dbURI = process.env.MONGO_URI_ATLAS;
        } else {
            dbURI = process.env.MONGODB_URI;
        }

        const conn = await mongoose.connect(dbURI); // connect to db using env variables; then connect to either localhost OR Atlas database.

        console.log(`Connected to MongoDB successfully: ${conn.connection.host}.`);
    } catch (error) { // if connection failed; error out message
        console.error('Error connecting to database: ', error);
    } 
}

module.exports = connectDB;