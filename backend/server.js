import express from "express";
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';

const PORT = process.env.PORT || 8080;

const server = express();

server.listen(PORT, () => {
  console.info('Server is running!');
});

server.use(bodyParser.json());

server.post('/api', (req, res) => {
  const body = req.body;
  const response = {};
  response.RequestId = uuidv4();
  response.Amount = req.body.Amount;
  res.status(201);
  res.header({'Content-Type': 'application/json'});
  res.send({ "message": "Server response!", response});
});
