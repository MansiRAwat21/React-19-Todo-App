import { useOptimistic, useState } from "react";
import FormTodo from "./FormTodo";
import ListContainer from "./ListContainer";
import { createTodoApi } from "../../services/auth.api";

const TodoPage = ({ initialTodos }: any) => {
  const [todos, setTodos] = useState(initialTodos);

  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [newTodo, ...state]
  );

  const createTodo = async (todo: any) => {
    // 1️⃣ optimistic update
    addOptimisticTodo(todo);

    try {
      // 2️⃣ API call
      const { data } = await createTodoApi(todo);

      // 3️⃣ replace optimistic todo with real one
      setTodos((prev) =>
        prev.map((t: any) =>
          t._id === todo._id ? data : t
        )
      );
    } catch (error) {
      // 4️⃣ rollback
      setTodos((prev) =>
        prev.filter((t: any) => t._id !== todo._id)
      );
    }
  };

  return (
    <>
      <FormTodo onCreate={createTodo} />
      <ListContainer tasks={optimisticTodos} />
    </>
  );
};

export default TodoPage;
