import React from 'react';
import {AddTodo, VisibleTodoList, Footer } from './';

const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);

export default TodoApp;