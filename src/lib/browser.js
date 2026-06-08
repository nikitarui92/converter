import { launch, executablePath } from 'puppeteer';

let browser;

export async function getBrowser() {
  if (!browser) {
    browser = await launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage'
      ]
    });
  }
  return browser;
}
