require('dotenv').config();
const puppeteer = require('puppeteer');
const express = require('express');
const app = express();
const morgan = require('morgan');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

const getAllData = async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://debank.com/profile/0x1c45e086ed143aef83c1209521a2ff5369f39abc?chain=arb');

    const element = await page.waitForSelector(
        '#Overview_defiItem__1e5s9 > div:nth-child(2)'
    );

    const rawData = await element.evaluate(el => el.textContent);
    let result = rawData.split(" ");
    await browser.close();
    return result
};

app.get('/', async (req, res) => {
    const data = await getAllData()

    res.status(200).json({
        "message": "hello from server",
        "data": data
    });
});

module.exports = app;
