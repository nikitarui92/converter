
export const PORT = Number(process.env.PORT || 3000)

// WebSocket endpoint of the browserless service, e.g. ws://browser:3000
export const BROWSER_WS_ENDPOINT = process.env.BROWSER_WS_ENDPOINT || 'ws://browser:3000';

// Optional token required by browserless (set TOKEN in the browser service)
export const BROWSER_TOKEN = process.env.BROWSER_TOKEN || '';

// Timeout (ms) for connecting to the browser service
export const BROWSER_CONNECT_TIMEOUT = Number(process.env.BROWSER_CONNECT_TIMEOUT || 30000);
