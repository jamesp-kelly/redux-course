import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../action-creators';

let AddTodo = ({ dispatch }) => {
  let input;

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input ref={node => {
        input = node;
      }} />
      <button 
        type="submit" 
        onClick={() => {
          dispatch(addTodo(input.value));
          input.value = '';  
        }}
      >
        Add Todo
      </button>
    </form>
  );
};

AddTodo = connect()(AddTodo);

export default AddTodo;