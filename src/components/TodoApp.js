import React from 'react';
import {AddTodo, VisibleTodoList, Footer } from './';

const TodoApp = ({ match }) => (
  <div>
    <AddTodo />
    <VisibleTodoList
      filter={match.params.filter || 'all'} 
    />
    <Footer />
  </div>
);

export default TodoApp;