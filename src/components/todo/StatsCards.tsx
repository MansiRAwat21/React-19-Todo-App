import { AiOutlineExclamationCircle, AiOutlineStock } from "react-icons/ai"
import { IoIosCheckmarkCircleOutline, IoMdTime } from "react-icons/io"
import Card from "../../ui/Card"

const StatsCards = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <Card count={1} title={"Total Tasks"} color={'blue'}  icon={<AiOutlineStock size={24} />}/>
            <Card count={0} title={"Active"} color={'yellow'}  icon={<IoMdTime size={24} />}/>
            <Card count={2} title={"Completed"} color={'green'}  icon={<IoIosCheckmarkCircleOutline  size={24} />}/>
            <Card count={4} title={"Overdue"} color={'red'}  icon={<AiOutlineExclamationCircle  size={24} />}/>
        </div>
    )
}

export default StatsCards