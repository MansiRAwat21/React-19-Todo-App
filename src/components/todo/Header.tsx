import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";
import { IoLogOutOutline } from "react-icons/io5";
import Tooltip from "../../ui/Tooltip";
import { useAuth } from "../../context/AuthContext";

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isLoading } = useAuth();

  if (isLoading) {
    return (
      <header className="flex justify-between items-center p-4 pt-7">
        <h1 className="text-2xl font-bold">Todo Master</h1>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gray-400 animate-pulse"></div>
          <div className="h-4 w-16 bg-gray-400 rounded animate-pulse"></div>
        </div>
      </header>
    );
  }


  return (
    <header className="flex justify-between items-center p-4 pt-7">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">Todo Master</h1>
        <p className="text-sm">Advanced task management with style</p>
      </div>

      <div className="flex justify-between items-center gap-3">
        {user && (
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
              {getInitials(user.name)}
            </div>

            <span className="text-sm font-medium hidden sm:block">
              {user.name}
            </span>
          </div>
        )}
        <Tooltip content="Theme">
          <button
            onClick={toggleTheme}
            className="dark:bg-gray-700"
          >
            {theme === "light" ? <FiMoon /> : <FiSun />}
          </button>
        </Tooltip>

        <Tooltip content="Logout">
          <button onClick={logout} className="text-xl text-gray-500 hover:text-red-500">
            <IoLogOutOutline />
          </button>
        </Tooltip>
      </div>
    </header>
  );
};

export default Header;
