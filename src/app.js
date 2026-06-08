import express, { json } from 'express';
import htmlRouter from './routers/html.router.js';
import { PORT } from './config.js';

const app = express();

app.use(json({
  limit: '20mb'
}));

app.use('/html', htmlRouter);

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
    return;
  }
  console.log(`server started on port ${PORT}`);
});
