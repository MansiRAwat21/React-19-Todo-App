 export const getPriorityClasses = (priority: string) => {
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