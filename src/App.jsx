import { useState } from 'react'
import './App.css'

function App() {
  const [todoList, setTodoList] = useState([]);
  const [inputValue, setInputValue] = useState(''); // State to control input
  const [isEditing, setIsEditing] = useState(false); // State to track if editing
  const [editIndex, setEditIndex] = useState(null); // Track index of the todo being edited

  const addTodo = (event) => {
    event.preventDefault();
    const toname = event.target.toname.value;

    // If editing an existing todo
    if (isEditing) {
      const updatedTodos = todoList.map((todo, index) =>
        index === editIndex ? toname : todo
      );
      setTodoList(updatedTodos);
      setIsEditing(false);
      setEditIndex(null);
    } 
    // Adding a new todo
    else {
      if (!todoList.includes(toname)) {
        let finalTodoList = [...todoList, toname];
        setTodoList(finalTodoList);
      } else {
        alert("This task already exists!!!");
      }
    }

    setInputValue(''); // Clears the input field by resetting state
    event.target.reset(); // Reset the form input
  };

  // Function to handle clicking on a todo to edit it
  const editTodo = (todo, index) => {
    setInputValue(todo); // Set the input value to the clicked todo
    setIsEditing(true); // Set editing mode to true
    setEditIndex(index); // Store the index of the todo being edited
  };

  let list = todoList.map((value, index) => {
    return (
      <TodoListItems
        value={value}
        key={index}
        indexNumber={index}
        todoList={todoList}
        setTodoList={setTodoList}
        editTodo={editTodo} // Pass editTodo function to child
      />
    );
  });

  return (
    <>
      <h1 className='container bg-violet-600 text-white py-4 font-bold text-lg'>My Todo</h1>
      <div>
        <form onSubmit={addTodo}>
          <input
            className='w-[40vw] my-4 mx-4 py-3 px-2 bg-violet-100 outline-none'
            placeholder={isEditing ? 'Edit your task' : 'Enter your task'} // Change placeholder based on editing
            type="text"
            name='toname'
            value={inputValue} // Bind input to state
            onChange={(e) => setInputValue(e.target.value)} // Update state when input changes
          />
          <button
            className='bg-violet-700 text-white p-3 rounded-md font-bold hover:bg-violet-900 transition-all duration-500 hover:scale-110'
            type="submit"
          >
            {isEditing ? 'Update' : 'Add'} {/* Change button text based on editing */}
          </button>
        </form>

        <div className='flex justify-center'>
          <ul className='list-none text-left'>
            {list}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;

function TodoListItems({ value, indexNumber, todoList, setTodoList, editTodo }) {
  const deleteRow = (e) => {
    const updatedTodos = todoList.filter((_, index) => index !== indexNumber);
    setTodoList(updatedTodos);
    e.target.reset();
  };

  return (
    <li className='bg-slate-200 w-[40vw] left-1 my-2 px-2 py-2 relative'>
      {indexNumber + 1}. {value}
      <span
        onClick={() => editTodo(value, indexNumber)} // Edit todo on click
        className='absolute right-6 px-2 cursor-pointer bg-green-600 text-white border-x-4 hover:bg-green-800 transition-all duration-500 text-sm font-bold rounded-full p-1 hover:scale-110'
        
      >
        Edit
      </span>
      <span
        onClick={deleteRow}
        className='text-red-500 font-bold absolute right-0 px-2 cursor-pointer hover:scale-150 transition-all duration-300'
      >
        &times;
      </span>
    </li>
  );
}
