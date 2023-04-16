const puppeteer = require("puppeteer");
const { map } = require("../app");

const scrape = async (iURL, iSelectedElement) => {
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto(iURL);
        const element = await page.waitForSelector(iSelectedElement);
        const rawData = await element.evaluate(el => el.textContent);
        let result = rawData.split(" ");
        await browser.close();
        return result;
    } catch (e) {
        console.error(e);
        return `Error: ${e}`;
    }
};

const getNumber = (iData) => {
    const regex = /\d+\.\d+/;
    let result = iData.match(regex)[0];
    console.log(result)
    return result
};

const mapData = (iData) => {
    const result = {}
    let title = iData[0].split('$')
    title = title[0]
    result.title = title
    const keys = []
    const values = []

    values.push(getNumber(iData[1]))

    for (const i in iData) {
        console.log(iData[i])
        if (i > 1) {
            if (Number(i) % 2 === 0) {
                keys.push(iData[i])
            } else {
                values.push(iData[i])
            }
        }
    }

    for (const i in keys) {
        if (keys[i]) {
            result[keys[i]] = values[i]
        }
    }

    console.log(result)
};

const scrapeDebank = async (req, res) => {
    const { chain } = req.query
    const baseURL = `https://debank.com/profile/0x1c45e086ed143aef83c1209521a2ff5369f39abc`
    let fullURL = baseURL
    if (chain) {
        fullURL = `${baseURL}?chain=${chain}`
    }
    let index = 2;
    let element = `#Overview_defiItem__1e5s9 > div:nth-child(${index})`

    let result = await scrape(fullURL, element);
    
    mapData(result)

    res.json(result);
};

module.exports = { scrapeDebank };