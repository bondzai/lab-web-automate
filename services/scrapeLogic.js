const puppeteer = require("puppeteer");

const scrape = async (iURL, iSelectedElement) => {
    try {
        const browser = await puppeteer.launch({ 
            headless: 'new',
            executablePath: '/usr/bin/google-chrome', 
        });
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
    return result
};

exports.scrapeDebank = async (req, res) => {
    try {
        let { chain, index } = req.query
        const baseURL = `https://debank.com/profile/0x1c45e086ed143aef83c1209521a2ff5369f39abc`
        let fullURL = baseURL
        if (chain) {
            fullURL = `${baseURL}?chain=${chain}`
        }
        if (!index || index < 2) {
            index = 2
        }
        let element = `#Overview_defiItem__1e5s9 > div:nth-child(${index})`
        let result = await scrape(fullURL, element);
        res.json(mapData(result));
    } catch (error) {
        res.status(500).send(error)
    }
};

exports.scrapeCryptoSentiment = async (req, res) => {
    const baseURL = `https://alternative.me/crypto/fear-and-greed-index/`
    let element = `#main > section > div > div.columns > div:nth-child(2) > div > div > div:nth-child(1) > div:nth-child(2) > div`
    let result = await scrape(baseURL, element)
    res.json({
        "fear_greed_index": Number(result[0])
    })
};