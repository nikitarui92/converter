import { getBrowser } from '../lib/browser.js';

export async function generateFromHtml(html, options = {}) {
  const browser = await getBrowser();
  const page = await browser.newPage();
  
  try {
    await page.setContent(html, {
      waitUntil: 'networkidle0'
    });

    const pdf = await page.pdf({
      format: options.format || 'A4',
      printBackground: true,
      margin: {
        top: '20mm',
        right: '10mm',
        bottom: '20mm',
        left: '10mm'
      },
      landscape: options.landscape || false,
    });

    return pdf;
  } finally {
    await page.close();
  }
}

export async function generateFromUrl(url, options = {}) {
  const browser = await getBrowser();
  const page = await browser.newPage();

  try {
    await page.goto(url, {
      waitUntil: 'networkidle0'
    });

    return await page.pdf({
      format: options.format || 'A4',
      printBackground: true
    });

  } finally {
    await page.close();
  }
}
