import express from "express";

const PORT = process.env.PORT || 8080;

const server = express();

server.listen(PORT, () => {
  console.info('Server is running!');
});

server.post('/api', (req, res) => {
  const body = req.body;
  console.log(body);
  res.status(201);
  // res.end('Hello back')
});

server.get('/api', (req, res) => {
  res.status(200);
  res.send({ "message": 'Hello back' });
});
