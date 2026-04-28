import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // ✅ import your logo

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="flex items-center justify-between px-8 py-5 max-w-7xl mx-auto">

        {/* 🔥 LOGO + TEXT */}
        <h1
          onClick={() => navigate("/")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img
            src={logo}
            alt="Flowtrack"
            className="h-9 w-auto object-contain hover:scale-105 transition"
          />
          <span className="text-xl font-bold tracking-wide text-gray-800">
            Flowtrack
          </span>
        </h1>

        {/* 🔗 NAV LINKS */}
        <div className="hidden md:flex gap-8 text-sm text-gray-900">
          <button
            className="hover:text-black hover:text-lg border-b border-blue-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home
          </button>

          <button
            className="hover:text-black hover:text-lg border-b border-blue-600 cursor-pointer"
            onClick={() => navigate("/workspace")}
          >
            Workspaces
          </button>

          <button
            className="hover:text-black hover:text-lg border-b border-blue-600 cursor-pointer"
          >
            Projects
          </button>

          <button
            className="hover:text-black hover:text-lg border-b border-blue-600 cursor-pointer"
            onClick={() => navigate("/about")}
          >
            About us
          </button>
        </div>

        {/* 🔐 AUTH BUTTONS */}
        <div className="flex gap-3">
          {!token ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="border border-purple-500 text-sm px-4 py-2 rounded-md hover:bg-purple-600 hover:text-white transition"
              >
                Sign in
              </button>

              <button
                onClick={() => navigate("/register")}
                className="border border-purple-500 text-sm px-4 py-2 rounded-md hover:bg-purple-600 hover:text-white transition"
              >
                Get started
              </button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="border border-purple-500 text-sm px-4 py-2 rounded-md hover:bg-purple-600 hover:text-white transition"
            >
              Logout
            </button>
          )}
        </div>

      </nav>
    </header>
  );
};

export default Navbar;