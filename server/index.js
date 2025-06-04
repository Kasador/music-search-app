const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

// middlewares 
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: `Server is up and running on port: ${PORT}`,
    });
});

app.listen(PORT, () => {
    console.log(`Server is up and running on port: ${PORT}`);
})