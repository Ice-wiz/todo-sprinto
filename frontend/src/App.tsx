import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <Navbar />
      <main className="flex-1 p-6 overflow-y-auto">
        <AppRoutes />
      </main>
    </div>
  );
}
