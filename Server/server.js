const express = require('express');
const path = require('path');
require('console.history');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

// app.use(express)

app.use(cors());

app.use(express.json());

let clientHistory;

app.post('/console', (req, res) => {
  // console.log('log from the server');
  const history = req.body.history[0].arguments[0];
  clientHistory = history;
  // res.on('end', () => {
  //   fs.appendFileSync('server/serverlogs.txt', 'test');
  //   res.status(200).send({ response: 'all good'});
  // })
})

app.get('/get', (req, res) => {
  // console.log('get request from client in server');
  res.send({ hello: 'from server'});
})

app.get('/logs', (req, res) => {
  // console.log('inside log route');
  res.status(200).send({ clientHistory: clientHistory, serverHistory: console.history });
  // res.send({ history: console.history });
});

app.get('/', (req, res) => {
  res.status(200).send('Hello world from server: ' + console.history[0].arguments[0]);
})

app.listen(port, function () {
  console.log('App listening on port: ' + port);
  // console.log(console.history);
 });