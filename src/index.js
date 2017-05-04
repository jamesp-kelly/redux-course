import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore } from 'redux';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';


//todo reducer
const todo = (state, action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }

      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
};

//todos reducer
const todos = (state = [], action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

//visibility filter reducer
const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch(action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
}

//root reducer
const todoApp = combineReducers({
  todos,
  visibilityFilter
});

const getVisibleTodos = (todos, filter) => {
  switch(filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
    default:
      return todos;
  }
}


//link component
const Link = ({
  active,
  children,
  onClick
}) => {

  if (active) {
    return <span>{children}</span>;
  }

  return (
    <a href="#"
      onClick={e => {
        e.preventDefault();
        onClick();
      }}>
      {children}
    </a>
  );
};

class FilterLink extends Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const { store } = this.context;
    const state = store.getState();

    return (
      <Link 
        active={
          props.filter === state.visibilityFilter
        }
        onClick={() =>
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: props.filter
          })
        } 
      >
        {props.children}
      </Link>
    )
  }
}

FilterLink.contextTypes = {
  store: PropTypes.object
};

//todo list component
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

//todo component
const Todo = ({
  onClick,
  completed,
  text
}) => (
  <li
    onClick={onClick}
    style={{
      'textDecoration':
        completed ? 'line-through' : 'none'
    }}
  >
    {text}
  </li>
);


//addtodo component
const AddTodo = (props, { store }) => {
  let input;

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input ref={node => {
        input = node;
      }} />
      <button 
        type="submit" 
        onClick={() => {
          store.dispatch({
            type: 'ADD_TODO',
            id: nextTodoId++,
            text: input.value
          });
          input.value = '';  
        }}
      >
        Add Todo
      </button>
    </form>
  );
};

AddTodo.contextTypes = {
  store: PropTypes.object
};

//footer component
const Footer = () => {
  return (
    <p>
      <FilterLink 
        filter="SHOW_ALL"
      >
        All
      </FilterLink>
      {' '}
      <FilterLink 
        filter="SHOW_COMPLETED"
      >
        Completed
      </FilterLink>
      {' '}
      <FilterLink 
        filter="SHOW_ACTIVE"
      >
        Active
      </FilterLink>
      {' '}
    </p>
  )
};

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(
      state.todos,
      state.visibilityFilter
    )
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: id =>  
      dispatch({
        type: 'TOGGLE_TODO',
        id
      })
  };
};

class VisibleTodoList extends Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const { store } = this.context;
    const state = store.getState();

    return (
      <TodoList
        todos={
          getVisibleTodos(
            state.todos,
            state.visibilityFilter
          )
        }
        onTodoClick={id =>
          store.dispatch({
            type: 'TOGGLE_TODO',
            id
          })
        }
      />
    );
  }
}

VisibleTodoList.contextTypes = {
  store: PropTypes.object
};

let nextTodoId = 0;
//todo app component
const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
);


ReactDOM.render(
  <Provider store={createStore(todoApp)}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
);