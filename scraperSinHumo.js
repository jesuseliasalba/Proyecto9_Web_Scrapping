const puppeteer = require("puppeteer");

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      var totalHeight = 0;
      var distance = 200;
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
      .$eval(".price", (el) => el.textContent.slice(0, -2))
      .catch(() => "0");

    elementData = {
      img,
      name,
      price,
    };

    results.push(elementData);
  }
  return results;
}

const scrapper = async (url) => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();
  await page.goto(url, {
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
  console.log(elementos);
};

scrapper("https://www.sinhumo.net/nuevos-productos");
