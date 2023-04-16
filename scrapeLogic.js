require("dotenv").config();
const puppeteer = require("puppeteer");

const getAllData = async () => {
    const browser = await puppeteer.launch({ headless: false });
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


const scrapeLogic = async (res) => {
    const browser = await puppeteer.launch({
        args: [
            "--disable-setuid-sandbox",
            "--no-sandbox",
            "--single-process",
            "--no-zygote",
        ],
        executablePath:
            process.env.NODE_ENV === "production"
                ? process.env.PUPPETEER_EXECUTABLE_PATH
                : puppeteer.executablePath(),
    });
    try {
        let x = await getAllData()
        console.log(x)

        res.send(x);
    } catch (e) {
        console.error(e);
        res.send(`Something went wrong while running Puppeteer: ${e}`);
    } finally {
        await browser.close();
    }
};

module.exports = { scrapeLogic };