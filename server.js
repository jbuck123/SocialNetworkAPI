const express = require('express')
const app = express();
const PORT = process.env.PORT || 8080
// // const routes = require('./routes')

const db = require('./config/connection')

app.use(express.urlencoded({extended: true}));
app.use(express.json());
// // s


db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}`);
    });
});