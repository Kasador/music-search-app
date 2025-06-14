const mongoose = require('mongoose');
const { Schema } = mongoose;

const authSchema = new Schema({ // new class model
    access_token: String,
    expires_in: Number,
    refresh_token: String
}, {timestamps: true });

module.exports = mongoose.model("Auth", authSchema); // defining the 'Auth' model