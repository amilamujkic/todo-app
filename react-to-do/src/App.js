import React from "react";
import "./App.css";

let incomplete = 3;
let complete = 0;

function Todo({ todo, index, completeTodo, uncompleteTodo, removeTodo }) {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      {todo.text}
      <div>
        <button onClick={() => 
          completeTodo(index)}
        > Complete </button>
        <button onClick={() => 
          uncompleteTodo(index)}
        > Not Done! </button>
        <button onClick={() => removeTodo(index)}>x</button>
      </div>
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}

function App() {
  const [todos, setTodos] = React.useState([
    {
      text: "Learn about React",
      isCompleted: false
    },
    {
      text: "Meet friend for lunch",
      isCompleted: false
    },
    {
      text: "Build really cool todo app",
      isCompleted: false
    }
  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    incomplete++;
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    if(newTodos[index].isCompleted === false) {
      complete++; 
      incomplete--; }
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const uncompleteTodo = index => {
    const newTodos = [...todos];
    if(newTodos[index].isCompleted === true) {
      complete-- 
      incomplete++; }
    newTodos[index].isCompleted = false;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    if(newTodos[index].isCompleted === true) {
      complete--; }
    else {
      incomplete--;
    }
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app">
      <div className="todo-list">
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            uncompleteTodo={uncompleteTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
      <div>
          <h3> <pre> Incomplete: {incomplete}      Completed: {complete} </pre> </h3>
          </div>
    </div>
  );
}

export default App;