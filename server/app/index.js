const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const routeHandler = require('./routes');

const app = express();

// middlewares 
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true
}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => { // /
    res.status(200).json({
        success: true,
        message: `Server is up and running...`,
    });
});

app.use('/api/v1', routeHandler);

module.exports = app;