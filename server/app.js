const express = require('express');
const cors = require('cors');
const app = express();

const port = 3001;

const playersRouter = require('./router/playersRouter');

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  })
);
app.use(express.json());

app.use('/players', playersRouter);

app.get('/', (req, res) => {
  res.status(200).send('Welcome, blues!');
});

app.use((req, res, next) => {
  res.status(404).send('Not Found!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    message: 'Internal Server Error',
    stacktrace: err.toString(),
  });
});

app.listen(port, () => {
  console.log(`[RUN] Server... | http://localhost:${port}`);
});
