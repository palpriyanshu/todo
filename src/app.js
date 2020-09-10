const express = require('express');
const { getRedisClient } = require('./redisClient');
const { Client } = require('./dataProvider.js');

const {
  initiateState,
  getCurrentState,
  addTask,
  updateHeading,
  deleteTask,
  updateTaskStatus,
} = require('./handler');

const app = express();

app.locals.client = new Client(getRedisClient());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

app.get('/api/initialState', initiateState);

app.get('/api/currentState', getCurrentState);

app.post('/api/addTask', addTask);

app.post('/api/deleteTodoList', initiateState);

app.post('/api/updateHeading', updateHeading);

app.post('/api/deleteTask', deleteTask);

app.post('/api/updateTaskStatus', updateTaskStatus);

module.exports = { app };
