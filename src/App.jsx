import React, { useEffect, useState } from "react";
import FilterButton from "./components/filterButtons";
import Todo from "./components/todo";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todos, setTodos] = useState([]); //contains all the todos
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [activeBtn, setActiveBtn] = useState("All"); //setting the btn active to change the btn bg


 //fetching from the local storage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos && storedTodos.length > 0) {

      setTodos(storedTodos)
    }
  }, []);


//setting in local storage if there is any change in the orignalTodos
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);


  useEffect(() => {
    filterByStatus(activeBtn);
  }, [activeBtn,todos]);

//adding the todos
  function formSubmit(e) {
    e.preventDefault();

    const newTodo = {
      todo: inputValue,
      todoId: uuidv4(),
      completed: false, 
    };

 
    setTodos([...todos, newTodo]);
    setInputValue("");
    setActiveBtn("All")
  }


  //deleting
  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.todoId !== id));
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
 
  }

  //toggling if the task is completed or not
  function toggleCompleted(todoId) {
    const updatedTodos = todos.map((todo) =>
      todo.todoId === todoId ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  
   
  }

  //filtering the todos by their status(completed|todo|all)
  function filterByStatus(status) {
    setActiveBtn(status);
    if (status === "Completed") {
      setFilteredTodos(todos.filter((todo) => todo.completed));
    } else if (status === "Todo") {
      setFilteredTodos(todos.filter((todo) => !todo.completed));
    } else if (status === "All") {
      setFilteredTodos(todos);
    }
  }


  
  return (
    <>
      <section className=" flex w-[100%] min-h-screen  items-center justify-center bg-[#0D202D] max-[500px]:bg-black max-[500px]:block">
        <div className="shadow-md p-4 bg-[#283643] text-white min-h-[500px] rounded-sm w-[400px] max-[500px]:min-h-screen max-[500px]:w-[100%]">
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

          {filteredTodos.length > 0 ? (
            filteredTodos.map((todo, index) => (
              <Todo
                key={index}
                todo={todo}
                toggleCompleted={toggleCompleted}
                editTodos={editTodos}
                deleteTodo={deleteTodo}
              />
            ))
          ) : (
            <p className="text-red-500">No Task here yet</p>
          )}
        </div>
      </section>
    </>
  );
}

export default App;
