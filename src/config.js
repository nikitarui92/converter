
export const PORT = Number(process.env.PORT || 3000)

export const BROWSER_WS_ENDPOINT = process.env.BROWSER_WS_ENDPOINT || 'ws://browser:3000';
export const BROWSER_TOKEN = process.env.BROWSER_TOKEN || '';
export const BROWSER_CONNECT_TIMEOUT = Number(process.env.BROWSER_CONNECT_TIMEOUT || 30000);
