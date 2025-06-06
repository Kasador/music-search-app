const mongoose = require('mongoose');
const { Schema } = mongoose;

const authSchema = new mongoose.Schema({ // new class model
    data: Schema.Types.Mixed
});

module.exports = mongoose.model("Auth", authSchema); // defining the 'Weather' model