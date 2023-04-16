require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

const { scrapeLogic } = require("./scrapeLogic");

app.get("/scrape", (req, res) => {
    scrapeLogic(res);
});

app.get('/', async (req, res) => {
    res.status(200).json({
        "message": "hello from server",
    });
});

module.exports = app;
