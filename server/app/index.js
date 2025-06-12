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
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//     next();
// });
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