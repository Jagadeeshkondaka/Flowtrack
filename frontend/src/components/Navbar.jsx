import { useNavigate } from "react-router-dom";

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
        <h1 className="text-lg font-semibold flex items-center gap-2">
          ⚙️ Flowtrack
        </h1>

        <div className="hidden md:flex gap-8 text-sm text-gray-900">
          <button className="hover:text-black hover:text-lg border-b border-blue-600 cursor-pointer" onClick={()=>navigate("/workspace")}>Workpsaces</button>
          <button className="hover:text-black hover:text-lg border-b border-blue-600 cursor-pointer">Projects</button>
          <button className="hover:text-black hover:text-lg border-b border-blue-600 cursor-pointer">Tasks</button>
          <button className="hover:text-black hover:text-lg border-b border-blue-600 cursor-pointer">About us</button>
        </div>

          {!token ? (
            <>
              {/* SIGN IN (subtle) */}
              <button
                onClick={() => navigate("/login")}
                className="border border-purple-500 text-sm px-4 py-2 rounded-md hover:bg-purple-600 transition"
              >
                Sign in
              </button>

              {/* CTA (primary) */}
              <button
                onClick={() => navigate("/register")}
                className="border border-purple-500 text-sm px-4 py-2 rounded-md hover:bg-purple-600 transition"
              >
                Get started
              </button>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="border border-purple-500 text-sm px-4 py-2 rounded-md hover:bg-purple-600 transition"
            >
              Logout
            </button>
          )}

      </nav>
      
      
    </header>
  );
};

export default Navbar;;