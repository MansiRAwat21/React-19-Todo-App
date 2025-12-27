import api from "./api";

export const loginApi = (payload:any) => api.post("/api/login", payload);

export const signupApi = (payload:any) => api.post("/api/create", payload); 
export const getUsersApi = () => api.get("/api/getallbook"); 
export const createTodoApi = (payload:any) => api.post("/api/createtodo",payload);  
export const getTodos = (owner_id:any) => api.get(`/api/gettodo/${owner_id}`); 
export const getTodoSummary = (owner_id:any) => api.get(`/api/todos/summary/${owner_id}`); 
export const deleteTodos = (id:any) => api.delete(`/api/deletetodo/${id}`); 
export const updateTodos = ({id,payload}:any) => api.put(`/api/updatetodo/${id}`,payload); 