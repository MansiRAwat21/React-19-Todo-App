export const formatDate = (dateString: string) => {
  if (!dateString) return "";

  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
export const formatMMDDYY = (dateString: string) => {
  const d = new Date(dateString);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const year = String(d.getFullYear()); // last 2 digits
  return `${month}/${day}/${year}`; // mm/dd/yy
};



export const formatDateTime = (dateString: string) => {
  if (!dateString) return "";

  return new Date(dateString).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};


export const getDueBadge = (dueDateStr: string) => {
  const today = new Date();
  const dueDate = new Date(dueDateStr);

  // remove time for comparison
  const diffTime = dueDate.setHours(0, 0, 0, 0) - today.setHours(0, 0, 0, 0);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let text = "";
  let bgClass = "";

  if (diffDays === 0) {
    text = "Today";
    bgClass = "bg-rose-200 text-rose-800 dark:bg-rose-500 dark:text-white";
  } else if (diffDays === 1) {
    text = "Tomorrow";
    bgClass = "bg-yellow-200 text-yellow-800 dark:bg-yellow-500 dark:text-white";
  } else if (diffDays > 1) {
    text = `${diffDays} days left`;
    bgClass = "bg-green-200 text-green-800 dark:bg-green-500 dark:text-white";
  } else {
    // overdue
    text = `Overdue`;
    bgClass = "bg-red-500 text-white dark:bg-red-600";
  }

  return { text, bgClass };
};
