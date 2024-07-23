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

const scrapper = async (url) => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();

  let salir = true;
  let cont = 2;
  url = url + "?page=1";
  const arrayProductos = [];

  while (salir) {
    await page.goto(url, {
      waitUntil: "domcontentloaded",
    });

    const cookies = await page.$("#pwa-consent-layer-accept-all-button");
    if (cookies) {
      await page.click("#pwa-consent-layer-accept-all-button");
    }

    autoScroll(page);
    let productos = await page.$$("div.sc-b0c0d999-0.hHtrNC");

    while (productos.length < 9) {
      productos = await page.$$("div.sc-b0c0d999-0.hHtrNC");
    }

    for (const producto of productos) {
      const img = await producto.$eval("picture > img", (el) => el.src);
      const name = await producto.$eval(
        `[data-test="product-title"]`,
        (el) => el.textContent
      );
      const price = await producto.$eval(
        "span.sc-e0c7d9f7-0.bPkjPs",
        (el) => el.textContent
      );
      productData = {
        name,
        img,
        price,
      };
      arrayProductos.push(productData);
    }
    console.log(arrayProductos);

    try {
      await page.waitForSelector("div.sc-b0c0d999-0.hHtrNC", { timeout: 5000 });
      url = url.slice(0, -1) + cont;
      cont++;
    } catch (e) {
      salir = false;
    }
  }
};

scrapper(
  "https://www.mediamarkt.es/es/category/port%C3%A1tiles-con-windows-1551.html"
);
