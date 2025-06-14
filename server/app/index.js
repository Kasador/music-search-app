const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const routeHandler = require('./routes');

const app = express();

// middlewares 
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => { // localhost/
    res.status(200).json({
        success: true,
        message: `Server is up and running...`,
    });
});

app.use('/api/v1', routeHandler);

module.exports = app;