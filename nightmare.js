const Nightmare = require('nightmare');

const scrapeLogic2 = async (res) => {
    const nightmare = Nightmare({ show: false });

    nightmare
        .goto('https://alternative.me/crypto/fear-and-greed-index/?daily_hash=7b944fccf15b441b788561d47884764c03ed9542')
        .wait('.market-fng-gauge__dial-number-value')
        .evaluate(() => {
            const element = document.querySelector('#main > section > div > div.columns > div:nth-child(2) > div > div');
            return element.innerText;
        })
        .end()
        .then((data) => console.log(data))
        .catch(error => console.error(error));
};

module.exports = { scrapeLogic2 };