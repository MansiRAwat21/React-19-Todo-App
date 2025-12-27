import Header from '../components/todo/Header';
import StatsCards from "../components/todo/StatsCards";
import { useAuth } from '../context/AuthContext';
import ListContainer from '../components/todo/ListContainer';
import { useQuery } from '@tanstack/react-query';
import { getTodos } from '../services/auth.api';


export const useGetTodos = (owner_id: string) => {
  return useQuery({
   queryKey: ["todos", owner_id],
    queryFn: () => getTodos(owner_id),
    enabled: !!owner_id, 
  });
};
const Home = () => {
    
  const { user } = useAuth();
  const { data, isLoading } = useGetTodos(user?._id as string);
    return (
      <div className="app-bg min-h-screen theme-transition max-w-4xl mx-auto ">
            <Header />
            <div className='px-5 sm:px-3'>
              <StatsCards />
            <ListContainer data={data} isLoading={isLoading}/>
            </div>
        </div>
    )
}

export default Home