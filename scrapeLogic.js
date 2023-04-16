const puppeteer = require("puppeteer");

const scrape = async (iURL, iSelectedElement) => {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(iURL);
        const element = await page.waitForSelector(iSelectedElement);
        const rawData = await element.evaluate(el => el.textContent);
        let result = rawData.split(" ");
        await browser.close();
        return result
    } catch (e) {
        console.error(e);
        return `Error: ${e}`;
    }
};

const scrapeDebank = async (req, res) => {
    const { chain } = req.query
    const baseURL = `https://debank.com/profile/0x1c45e086ed143aef83c1209521a2ff5369f39abc`
    let fullURL = baseURL
    if (chain) {
        fullURL = `${baseURL}?chain${chain}`
    }

    let result = await scrape(
        fullURL,
        '#Overview_defiItem__1e5s9 > div:nth-child(3)'
    );
    res.json(result);
};

module.exports = { scrapeDebank };