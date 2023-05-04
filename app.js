require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

const { scrapeDebank, scrapeCryptoSentiment } = require("./services/scrapeLogic");

app.get("/debank", (req, res) => {
    scrapeDebank(req, res);
});

app.get("/index", (req, res) => {
    scrapeCryptoSentiment(req, res);
});

app.get('/', async (req, res) => {
    res.status(200).json({
        "message": "hello from server",
    });
});

module.exports = app;
