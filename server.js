const express = require('express').Router()
const app = express();
const PORT = process.env.PORT || 8080

const db = require('./config/connection')




db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}`);
    });
});