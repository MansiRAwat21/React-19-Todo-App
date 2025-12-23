import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signupApi,createTodoApi,deleteTodos } from "../services/auth.api";

export const useSignup = () => {
  return useMutation({
    mutationFn: signupApi,
  });
};

// create todos
export const useCreateTodos = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodoApi,

    onSuccess: (_data, variables) => {
      // todos list ko refresh karo
      queryClient.invalidateQueries({
        queryKey: ["todos", variables.owner_id],
      });
    },
  });
};

export const useDeleteTodos = (owner_id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodos,

    onSuccess: (_data) => {
      // todos list ko refresh karo
      queryClient.invalidateQueries({
        queryKey: ["todos",owner_id],
      });
    },
  });
};