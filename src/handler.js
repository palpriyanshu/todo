const { getDefaultStatus, getNextStatus } = require('./todoStates.js');

const LAST_TODO_ID = 'lastTodoId';
const STATE = 'state';
const DEFAULT_HEADING = 'todo';

const initiateState = async function (req, res) {
  const { client } = req.app.locals;
  const state = { heading: DEFAULT_HEADING, todoList: [] };
  await client.setValue(STATE, JSON.stringify(state));
  res.send(JSON.stringify(state));
};

const getCurrentState = async function (req, res) {
  const { client } = req.app.locals;
  const state = await client.getValue(STATE);
  res.send(state);
};

const addTask = async function (req, res) {
  const { client } = req.app.locals;
  const id = await client.incrID(LAST_TODO_ID);
  const todo = { task: req.body.task, status: getDefaultStatus(), id };
  const string = await client.getValue(STATE);
  const state = JSON.parse(string);
  state.todoList.push(todo);
  await client.setValue(STATE, JSON.stringify(state));
  res.end();
};

const updateHeading = async function (req, res) {
  const { client } = req.app.locals;
  const string = await client.getValue(STATE);
  const state = JSON.parse(string);
  state.heading = req.body.heading;
  await client.setValue(STATE, JSON.stringify(state));
  res.end();
};

const deleteTask = async function (req, res) {
  const { client } = req.app.locals;
  const string = await client.getValue(STATE);
  const state = JSON.parse(string);
  state.todoList = state.todoList.filter((todo) => todo.id !== req.body.id);
  await client.setValue(STATE, JSON.stringify(state));
  res.end();
};

const updateTaskStatus = async function (req, res) {
  const { client } = req.app.locals;
  const string = await client.getValue(STATE);
  const state = JSON.parse(string);
  const index = state.todoList.findIndex((todo) => todo.id === req.body.id);
  const todo = state.todoList[index];
  todo.status = getNextStatus(todo.status);
  await client.setValue(STATE, JSON.stringify(state));
  res.end();
};

module.exports = {
  initiateState,
  getCurrentState,
  addTask,
  updateHeading,
  deleteTask,
  updateTaskStatus,
};
