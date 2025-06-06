const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const routeHandler = require('./routes');

const app = express();

// middlewares 
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: `Server is up and running...`,
    });
});

app.use('/api/v1', routeHandler);

module.exports = app;