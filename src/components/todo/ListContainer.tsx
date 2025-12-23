import { useState } from "react";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import { category, priorities } from "../../utils/type";
import { formatDateTime, getDueBadge } from "../../utils/date";
import { useDeleteTodos } from "../../hooks/Apis";
import { useAuth } from "../../context/AuthContext";
import DeleteModal from "../../ui/DeleteModal";
import FormTodo from "./FormTodo";
import Modal from "../../ui/Modal";


const ListContainer = ({ data, isLoading }: any) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showTodoModal, setShowTodoModal] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<string | null>(null);

  const confirmDelete = (id: string) => {
    setTodoToDelete(id);
    setShowDeleteModal(true);
  };
  const tabs = [
    { label: 'All' },
    { label: 'Active' },
    { label: 'Completed' }
  ]
  const getPriorityClasses = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-500 text-white dark:bg-red-600 dark:text-white";
      case "medium":
        return "bg-yellow-300 text-gray-800 dark:bg-yellow-500 dark:text-gray-900";
      case "low":
        return "bg-green-300 text-gray-800 dark:bg-green-500 dark:text-gray-900";
      default:
        return "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  const [activeTab, setActiveTab] = useState("All");

  const { user } = useAuth();

  const deleteTodoMutation = useDeleteTodos(user?._id as string);

  const handleDelete = () => {
    if (todoToDelete) {
      deleteTodoMutation.mutate(todoToDelete);
    }
    setShowDeleteModal(false);
    setTodoToDelete(null);
  };
  if (isLoading) return <p>Loading Todos..</p>

  return (
    <div className="mt-4">
       <Modal
        isOpen={showTodoModal}
        onClose={() => setShowTodoModal(false)}
        title="Add New Todo"
      >
        <FormTodo onClose={() => setShowTodoModal(false)} />
      </Modal>
      <div className="flex justify-between items-center gap-2 border-y py-3 border-gray-300 mb-4 ">
       <div className="flex gap-2">
         {tabs.map((tab) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className={`px-4 py-2 rounded-t ${activeTab === tab.label
              ? "bg-primary text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
          >
            {tab.label}
          </button>
        ))}
       </div>
        <button className="bg-primary  rounded-md p-2 text-white" onClick={() => setShowTodoModal(true)}>Create Todo</button>
      </div>
      <div className="flex gap-2 mb-6">
        <select
          className="p-2 rounded border dark:bg-gray-700"
        >
          <option value="" selected>Select Priority</option>
          {priorities?.map((item) =>
            <option value={item.value}>{item.label}</option>
          )}

        </select>
        <select
          className="p-2 rounded border dark:bg-gray-700"
        >
          <option value="" selected>Select Category</option>
          {category?.map((item) =>
            <option value={item.value}>{item.label}</option>
          )}
        </select>
        <select className="p-2 rounded border dark:bg-gray-700">
          <option>Sort by Priority</option>
          <option>High to Low</option>
          <option>Low to High</option>
        </select>
      </div>


      <div className="space-y-2">
        {data?.data?.map((task: any) => (
          <div
            key={task?._id}
            className="flex items-start justify-between p-4 rounded-lg 
                 bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-200"
          >
            <div className="flex gap-3">
              {/* Checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded-full border-gray-300 dark:border-gray-600"
                />
              </div>

              {/* Task Info */}
              <div>
                <div className="flex gap-2 mb-1">
                  <span className={`px-3 py-1 rounded-md text-xs font-semibold capitalize ${getPriorityClasses(task.priority)}`}>
                    {task.priority}
                  </span>
                  <span className="bg-purple-500 text-white px-2 py-1 rounded text-xs dark:bg-purple-700 capitalize">
                    {task.category}
                  </span>

                  {task?.due_at && (() => {
                    const { text, bgClass } = getDueBadge(task.due_at);
                    return (
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs flex items-center gap-1 ${bgClass}`}
                      >
                        <FaRegCalendarAlt className="text-xs" />
                        {text}
                      </span>
                    );
                  })()}

                </div>

                <h3 className="font-semibold text-gray-900 dark:text-gray-100">{task.title}</h3>
                <p className="text-xs mb-1 text-gray-900 dark:text-gray-100">{task.description}</p>
                <p className="text-gray-500 text-xs dark:text-gray-400">Created: {formatDateTime(task.createdAt)}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
              <FaRegEdit className="hover:text-primary-hover dark:hover:text-primary-hover cursor-pointer" />
              <FaRegTrashAlt className="hover:text-red-600 dark:hover:text-red-500 cursor-pointer" onClick={() => confirmDelete(task?._id)} />
            </div>
          </div>
        ))}
      </div>

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Todo"
        message="Are you sure you want to delete this todo? This action cannot be undone."
      />

      {/* Tab Content */}
      <div className="p-4 border rounded-b mt-3">
        {activeTab === "All" && <p>All items</p>}
        {activeTab === "Active" && <p>Active items</p>}
        {activeTab === "Completed" && <p>Completed items</p>}
      </div>

    </div>
  )
}

export default ListContainer

