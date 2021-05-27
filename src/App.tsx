import React, { useState } from 'react';
import './App.css';

interface Todo {
  todo: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState('');

  const toggleStatus = (i: number) => {
    const stateCopy = [...todos];
    const currentTodoStatus = stateCopy[i].completed;
    stateCopy[i].completed = !currentTodoStatus;
    setTodos(stateCopy);
  };

  const deleteTodo = (i: number) => {
    const stateCopy = [...todos];
    stateCopy.splice(i, 1);
    setTodos(stateCopy);
  };

  return (
    <div className="App">
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();

          // If there's no text in the input box, return early
          if (inputText === '') return;

          const newTodo: Todo = {
            todo: inputText,
            completed: false,
          };
          setTodos([...todos, newTodo]);
          setInputText('');
        }}
      >
        <input
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
          }}
        ></input>
        <button>Add Todo</button>
      </form>
      <ul>
        {todos.map(({ todo, completed }, idx) => (
          <li className="Todo-Item" key={idx}>
            <p
              onClick={() => toggleStatus(idx)}
              style={{ textDecoration: completed ? 'line-through' : '' }}
            >
              {todo}
            </p>
            <span
              onClick={() => deleteTodo(idx)}
              style={{ color: 'grey', fontSize: '12px' }}
              className="Delete"
            >
              {' '}
              Delete
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
