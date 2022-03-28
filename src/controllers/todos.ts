import { RequestHandler } from "express";
import { Todo } from "../models/todo";
import MySQLClient from "../lib/mysql/client";
import mysql from "mysql";

export const createTodo: RequestHandler = async (req, res, next) => {
  const { id, text } = req.body as { id: number; text: string };

  try {
    const sql = mysql.format("INSERT INTO todos VALUES(?, ?)", [id, text]);
    await MySQLClient.query(sql);
  } catch (err) {
    next(err);
  }

  res.status(201).json({ message: "Todo was successfully created." });
};

export const getTodos: RequestHandler = async (req, res, next) => {
  let todos: Todo[] = [];
  try {
    todos = (await MySQLClient.query("SELECT * FROM todos")) as Todo[];
  } catch (err) {
    next(err);
  }

  res.json({ message: "Todos were successfully obtained.", todos: todos });
};

export const updateTodo: RequestHandler<{ id: number }> = async (
  req,
  res,
  next
) => {
  const targetId = req.params.id;
  const updateText = (req.body as { text: string }).text;

  try {
    const sql = mysql.format("UPDATE todos SET text = ? WHERE id = ?", [
      updateText,
      targetId,
    ]);
    await MySQLClient.query(sql);
  } catch (err) {
    next(err);
  }

  res.json({ message: "Target task was successfully updated." });
};

export const deleteTodo: RequestHandler<{ id: number }> = async (
  req,
  res,
  next
) => {
  const targetId = req.params.id;

  try {
    const sql = mysql.format("DELETE FROM todos WHERE id = ?", [targetId]);
    await MySQLClient.query(sql);
  } catch (err) {
    next(err);
  }

  res.json({ message: "Target task was successfully deleted." });
};
