import { RequestHandler } from "express";
import { Todo } from "../models/todo";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res) => {
  const text = (req.body as { text: string }).text;
  const newTodo = new Todo(Math.random().toString(), text);

  TODOS.push(newTodo);

  res
    .status(201)
    .json({ message: "Todo was successfully created.", createdTodo: newTodo });
};

export const getTodos: RequestHandler = (req, res) => {
  res.json({ message: "Todos were successfully obtained.", todos: TODOS });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res) => {
  const todoId = req.params.id;
  const updateText = (req.body as { text: string }).text;

  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);

  if (todoIndex < 0) {
    throw new Error("Target todo not found.");
  }

  TODOS[todoIndex] = new Todo(todoId, updateText);

  res.json({
    message: "Target task was successfully updated.",
    updateTodo: TODOS[todoIndex],
  });
};

export const deleteTodo: RequestHandler<{ id: string }> = (req, res) => {
  const todoId = req.params.id;
  const todoIndex = TODOS.findIndex((todo) => todo.id === todoId);

  if (todoIndex < 0) {
    throw new Error("Target todo not found.");
  }

  TODOS.splice(todoIndex, 1);

  res.json({ message: "Target task was successfully deleted." });
};
