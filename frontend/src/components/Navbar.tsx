import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { name: "Dashboard", path: "/dashboard" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="w-60 bg-white dark:bg-gray-800 shadow-md h-screen p-4 flex flex-col justify-between sticky top-0">
      <div>
        <h1 className="text-xl font-bold mb-6">Taskify</h1>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-3 py-2 rounded ${
                location.pathname === item.path
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

     {user&& <button onClick={logout} className="text-red-500 text-sm block px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">Logout</button>}
    </aside>
  );
}
