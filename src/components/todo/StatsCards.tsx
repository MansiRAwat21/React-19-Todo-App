import { AiOutlineExclamationCircle, AiOutlineStock } from "react-icons/ai"
import { IoIosCheckmarkCircleOutline, IoMdTime } from "react-icons/io"
import Card from "../../ui/Card"
import { useQuery } from "@tanstack/react-query";
import { getTodoSummary } from "../../services/auth.api";
import { useAuth } from "../../context/AuthContext";

export const useGetTodosSummary = (owner_id: string) => {
    return useQuery({
        queryKey: ["todosSummery", owner_id],
        queryFn: () => getTodoSummary(owner_id),
        enabled: !!owner_id,
    });
};
const StatsCards = () => {
    const { user } = useAuth();
    const { data, isLoading } = useGetTodosSummary(user?._id as string);
    if (isLoading) return <p>Loading...</p>
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mb-4">
            <Card count={data?.data?.total} title={"Total Tasks"} color={'blue'} icon={<AiOutlineStock size={24} />} />
            <Card count={data?.data?.active} title={"Active"} color={'yellow'} icon={<IoMdTime size={24} />} />
            <Card count={data?.data?.completed} title={"Completed"} color={'green'} icon={<IoIosCheckmarkCircleOutline size={24} />} />
            <Card count={data?.data?.overdue} title={"Overdue"} color={'red'} icon={<AiOutlineExclamationCircle size={24} />} />
        </div>
    )
}

export default StatsCards