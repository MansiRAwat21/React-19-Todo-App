import type { CardProps } from "../types/Todos";

const Card = ({ count, title, icon, color }: CardProps) => {
  const colorMap: Record<
    string,
    {
      border: string;
      text: string;
      icon: string;
    }
  > = {
    red: {
      border: "border-red-500 dark:border-red-400",
      text: "text-red-600 dark:text-red-400",
      icon: "text-red-500 dark:text-red-400",
    },
    green: {
      border: "border-green-500 dark:border-green-400",
      text: "text-green-600 dark:text-green-400",
      icon: "text-green-500 dark:text-green-400",
    },
    blue: {
      border: "border-blue-500 dark:border-blue-400",
      text: "text-blue-600 dark:text-blue-400",
      icon: "text-blue-500 dark:text-blue-400",
    },
    yellow: {
      border: "border-yellow-500 dark:border-yellow-400",
      text: "text-yellow-600 dark:text-yellow-400",
      icon: "text-yellow-500 dark:text-yellow-400",
    },
  };

  const styles = colorMap[color];

  return (
    <div
      className={`card-base border-l-4 flex w-full justify-between items-center p-4 ${styles.border}`}
    >
      <div className="flex flex-col justify-start items-center">
        <p
          className={`text-start w-full text-lg font-semibold ${styles.text}`}
        >
          {count}
        </p>
        <p className="card-title">{title}</p>
      </div>

      <span className={`${styles.icon}`}>{icon}</span>
    </div>
  );
};

export default Card;
