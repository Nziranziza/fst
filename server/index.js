import 'dotenv/config';
import express from 'express';
import path from 'path';
import cors from 'cors';

import routes from './routes';

const { PORT = 3000, NODE_ENV } = process.env;
const app = express();
const __dirname = path.resolve();

app.use(cors())
app.use('/api/v1', routes);
app.use(express.static(path.join(__dirname, './client/build/')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/', 'index.html'))
})

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  const isDev = NODE_ENV === 'development';
  return res.status(500).json({
    message: 'Something went wrong',
    error: isDev ? error : null
  });
});

app.listen(PORT, () => {
  console.log(`app started and listening on port ${PORT}`)
})