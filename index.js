const puppeteer = require('puppeteer');

const getAllData = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://debank.com/profile/0x1c45e086ed143aef83c1209521a2ff5369f39abc');

    const element = await page.waitForSelector(
        'div > .Project_portfolioProject__2f0GB'
    );

    const result = await element.evaluate(el => el.textContent);
    console.log(result)

    await browser.close();
};

getAllData()