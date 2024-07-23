const puppeteer = require("puppeteer");

async function parseProductos(page) {
  let element = await page.$("div.sc-835d3f28-0.kTdeVZ.sc-2c5733a9-2.pnruS");

  const img = await element.$eval(
    `[data-index-number="0"] img`,
    (el) => el.src
  );

  const name = await element.$eval(
    "h1.sc-3f2da4f5-0.fzAxvp",
    (el) => el.textContent
  );
  const price = await element.$eval(
    "span.sc-3f2da4f5-0.gQKBbI",
    (el) => el.textContent
  );

  elementData = {
    img,
    name,
    price,
  };

  return elementData;
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

  await page.waitForSelector("#pwa-consent-layer-accept-all-button");

  await page.$eval("#pwa-consent-layer-accept-all-button", (el) => {
    el.click();
  });

  let results = [];

  await page.waitForSelector(`button[data-test="mms-search-srp-loadmore"]`);

  await page.$eval(`button[data-test="mms-search-srp-loadmore"]`, (el) => {
    el.click();
  });

  // displayAllProducts(page)
};

const displayAllProducts = async (page) => {
  await page.$eval(`[data-test="mms-search-srp-loadmore"]`, (el) => {
    el.click();
  });
  console.log("Me voy a ejecutar otra vez");
};

const repeat = async (page, array) => {
  const allProducts = await page.$$("");

  const name = "";
  const price = "";
  const img = "";

  const productData = {
    name,
    price,
    img,
  };
};

// scrapper(
//   "https://www.mediamarkt.es/es/product/_portatil-hp-15-fd0019ns-156-full-hd-intel%C2%AE-coretm-i5-1334u-16gb-ram-1tb-ssd-graficos-iris%C2%AE-xe-windows-11-h-plata-natural-1572548.html"
// );

scrapper(
  "https://www.mediamarkt.es/es/category/port%C3%A1tiles-con-windows-1551.html?page=1"
);
