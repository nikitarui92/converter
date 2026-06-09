import { connect } from 'puppeteer';
import {
  BROWSER_WS_ENDPOINT,
  BROWSER_TOKEN,
  BROWSER_CONNECT_TIMEOUT,
} from '../config.js';

let browser;

function buildWsEndpoint() {
  const url = new URL(BROWSER_WS_ENDPOINT);
  if (BROWSER_TOKEN) {
    url.searchParams.set('token', BROWSER_TOKEN);
  }
  return url.toString();
}

export async function getBrowser() {
  if (!browser) {
    browser = await connect({
      browserWSEndpoint: buildWsEndpoint(),
      protocolTimeout: BROWSER_CONNECT_TIMEOUT,
    });

    browser.on('disconnected', () => {
      browser = null;
    });
  }

  return browser;
}
