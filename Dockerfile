FROM node:22

WORKDIR /app

ENV PUPPETEER_SKIP_DOWNLOAD=true

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

CMD ["node", "./src/app.js"]
