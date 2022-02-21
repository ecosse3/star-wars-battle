import puppeteer, { Browser, Page } from 'puppeteer';

let browser: Browser;
let page: Page;

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: true
  });
  page = await browser.newPage();

  page.emulate({
    viewport: {
      width: 1920,
      height: 1080
    },
    userAgent: ''
  });
});

afterEach(() => {
  browser.close();
});

const timeoutDefault = 50000;

test(
  'renders two cards',
  async () => {
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.MuiPaper-root');

    const cards = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll('.MuiCard-root'),
        (element) => element.textContent
      )
    );
    expect(cards.length).toBe(2);
  },
  timeoutDefault
);

test(
  'renders card with People text',
  async () => {
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.MuiPaper-root');

    // Gets text of left card
    const [leftCard] = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll('.MuiTypography-h6'),
        (element) => element.textContent
      )
    );
    expect(leftCard).toContain('People');
  },
  timeoutDefault
);

test(
  'clicks card with People text and renders points for two players',
  async () => {
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.MuiPaper-root');
    await page.waitForSelector('button');

    // Clicks left card
    const [button] = await page.$x("//button[contains(., 'People')]");
    await button.click();

    await page.waitForSelector('h4');
    const points = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll('.MuiTypography-h4 > strong'),
        (element) => element.textContent
      )
    );
    expect(points).toHaveLength(2);
  },
  timeoutDefault
);

afterAll(() => browser.close());
