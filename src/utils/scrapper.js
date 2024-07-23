const puppeteer = require("puppeteer");

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      var totalHeight = 0;
      var distance = 200; // If your internet connection is slow, decrease this value to make scrolling slower.
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

async function parseProductos(page) {
  let elements = await page.$$(
    "article.product-miniature.js-product-miniature"
  );

  let results = [];

  for (let element of elements) {
    const img = await element.$eval("img.product-img", (el) => el.src);
    const name = await element.$eval(
      "span.h3.product-title > a",
      (el) => el.textContent
    );

    const price = await element
      .$eval(".price", (el) => parseFloat(el.textContent.slice(0, -2)))
      .catch(() => "0");

    elementData = {
      name,
      price,
      img,
    };

    results.push(elementData);
  }
  return results;
}

const URL = "https://www.sinhumo.net/nuevos-productos";

const scrapper = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();
  await page.goto(URL, {
    waitUntil: "domcontentloaded",
  });

  await page.waitForSelector("#adultcontentOK");

  await page.$eval("#adultcontentOK", (el) => {
    el.click();
  });

  await page.waitForSelector("button.hi-cookie-btn.hi-cookie-btn-accept-all");

  await page.$eval("button.hi-cookie-btn.hi-cookie-btn-accept-all", (el) => {
    el.click();
  });

  await autoScroll(page);

  const elementos = await parseProductos(page);
  await browser.close();
  return elementos;
};

module.exports = { scrapper };
