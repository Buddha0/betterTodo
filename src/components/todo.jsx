import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

export default function Todo({todo,toggleCompleted,editTodos,deleteTodo}){
    return(
        <>
         <div
              className="flex gap-2 shadow p-2 items-center mb-2"
              key={todo.todoId}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="cursor-pointer"
                  checked={todo.completed}
                  onChange={() => toggleCompleted(todo.todoId)}
                />
                <p style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                  {todo.todo}
                </p>
              </div>
              <CiEdit onClick={() => editTodos(todo.todoId)} className="cursor-pointer" />
              <MdDelete onClick={() => deleteTodo(todo.todoId)} className="cursor-pointer" />
            </div>
        </>
    )
}