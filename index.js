const puppeteer = require('puppeteer');

const getAllData = async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto('https://debank.com/profile/0x1c45e086ed143aef83c1209521a2ff5369f39abc');

    const element = await page.waitForSelector(
        '#Overview_defiItem__1e5s9 > div:nth-child(2)'
    );

    const rawData = await element.evaluate(el => el.textContent);
    let result = rawData.split(" ")
    console.log(result)

    await browser.close();
};

getAllData()
