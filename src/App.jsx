import React, { useEffect, useState } from "react";

import FilterButton from "./components/filterButtons";
import Todo from "./components/todo";

function App() {
  const [originalTodos, setOriginalTodos] = useState([]); //contains all the todos
  const [todos, setTodos] = useState([]); //also contains all the todos but will change when filtering by status(completed|todo|all)
  const [inputValue, setInputValue] = useState("");
  const [id, setId] = useState(1); //id for the todos
  const [activeBtn, setActiveBtn] = useState("All"); //setting the btn active to change the btn bg


 //fetching from the local storage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos && storedTodos.length > 0) {
      setTodos(storedTodos);
      setOriginalTodos(storedTodos)
    }
  }, []);


//setting in local storage if there is any change in the orignalTodos
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(originalTodos));
  }, [originalTodos]);



//adding the todos
  function formSubmit(e) {
    e.preventDefault();

    const newTodo = {
      todo: inputValue,
      todoId: id,
      completed: false, 
    };

    setTodos([...todos, newTodo]);
    setOriginalTodos([...originalTodos, newTodo]);
    setId(id + 1); //incrementing the id
    setInputValue("");
    setActiveBtn("All")
  }


  //deleting
  function deleteTodo(id) {
    const newTodo = todos.filter((todo) => todo.todoId !== id);
    setTodos(newTodo);
    setOriginalTodos(originalTodos.filter((todo) => todo.todoId !== id));
  }

  //editing
  function editTodos(id) {
    const editedTodo = prompt("Enter the new todo");
    const updatedTodos = todos.map((todo) => {
      if (todo.todoId === id) {
        return { ...todo, todo: editedTodo };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setOriginalTodos(updatedTodos);
  }

  //toggling if the task is completed or not
  function toggleCompleted(todoId) {
    const updatedTodos = todos.map((todo) =>
      todo.todoId === todoId ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    setOriginalTodos(updatedTodos);
  }

  //filtering the todos by their status(completed|todo|all)
  function filterByStatus(status){
    if(status === "Completed"){
      setActiveBtn("Completed");
      const completedTasks = originalTodos.filter((todo) => todo.completed);
      setTodos(completedTasks);
    }
    else if(status === "Todo"){
      setActiveBtn("Todo");
      const unCompletedTasks = originalTodos.filter((todo) => !todo.completed);
      setTodos(unCompletedTasks);
    }

    else if(status === "All"){
      setActiveBtn("All");
      setTodos(originalTodos);
    }
  }


  
  return (
    <>
      <section className=" flex w-full min-h-screen  items-center justify-center bg-[#0D202D] max-[500px]:bg-black max-[500px]:block">
        <div className="shadow-md p-4 bg-[#283643] text-white min-h-[500px] rounded-sm w-[400px] max-[500px]:min-h-screen max-[500px]:w-full">
          <h1 className="text-2xl pt-2 pb-2 border-white">Todos</h1>
          <form onSubmit={formSubmit} className="mb-3">
            <input
              type="text"
              placeholder="What is your main focus today?"
              required
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
              className="pt-2 pb-2 w-full outline-none rounded-sm border-b-2 bg-transparent"
            />
          </form>

          <div className="flex gap-5 mb-3 mt-3">
          <FilterButton status = {"All"} filterByStatus={filterByStatus} activeBtn = {activeBtn} setActiveBtn = {setActiveBtn}/>
            <FilterButton status={"Completed"} filterByStatus= {filterByStatus} activeBtn = {activeBtn} setActiveBtn = {setActiveBtn}/>
            <FilterButton status = {"Todo"} filterByStatus = {filterByStatus} activeBtn = {activeBtn} setActiveBtn = {setActiveBtn}/>
          
          </div>

          {todos.map((todo,index) => (
           <Todo todo = {todo} toggleCompleted = {toggleCompleted} editTodos = {editTodos} deleteTodo = {deleteTodo} key = {index}/>
          ))}
        </div>
      </section>
    </>
  );
}

export default App;
