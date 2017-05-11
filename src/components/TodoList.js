import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Todo from './Todo';
import { toggleTodo } from '../action-creators';
import { getVisibleTodos } from '../util';

const TodoList = ({
  todos,
  onTodoClick
}) => (
  <ul>
    {todos.map(todo =>
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)} /> 
    )}
  </ul>
)

const mapStateToProps = (state, ownProps) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      ownProps.match.params.filter || 'all'
    )
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: id =>  
      dispatch(toggleTodo(id))
  };
};

const VisibleTodoList = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList));

export default VisibleTodoList;