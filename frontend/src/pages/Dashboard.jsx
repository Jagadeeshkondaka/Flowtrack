import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import Navbar from "../components/Navbar";
import Folder from "../components/Folder";

const Dashboard = () => {
  const { workspaceId } = useParams();
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");

  // 🔥 FETCH PROJECTS
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get(`/projects/${workspaceId}`);
        setProjects(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (workspaceId) fetchProjects();
  }, [workspaceId]);

  // 🔥 CREATE PROJECT
  const handleCreate = async () => {
    try {
      if (!name) return;

      const res = await API.post("/projects", {
        name,
        workspaceId, // 🔥 IMPORTANT FIX
      });

      setProjects([...projects, res.data]);
      setShowModal(false);
      setName("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <Navbar/>
    <section class="relative flex flex-col items-center justify-center text-center py-24 px-6 
      bg-gradient-to-b from-black via-[#0a0a0f] to-[#111827] overflow-hidden">

    <span class="text-xs tracking-widest bg-gray-300 px-5 py-1 rounded-full mb-6">
      JOIN THE SPEED REVOLUTION
    </span>

    <h1 class="text-4xl md:text-6xl  text-white font-bold leading-tight">
      Manage your team projects
    </h1>

    <p class="text-2xl md:text-3xl italic text-purple-400 mt-3 mb-6">
      Like a Ace...
    </p>

 
    <button class="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 rounded-full 
      font-medium shadow-lg hover:scale-105 transition">
      Get Started →
    </button>
      

  </section>
  <section className="bg-gray-200 py-32 px-6 border-b border-black">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-around gap-2">

        {/* LEFT SIDE TEXT */}
        <div className="max-w-lg">
          <h1 className="text-6xl font-bold text-gray-900 leading-tight">
            Manage your Projects smarter
          </h1>

          <p className="mt-4 text-gray-600 text-lg">
            Organize projects, Create projects, and collaborate seamlessly —
            all in one powerful dashboard.
          </p>
        </div>

        {/* RIGHT SIDE FOLDER */}
        <div className="flex justify-center items-center py-10">
          <Folder
            size={2.5}
            color="#7C3AED"
            items={[
              <div className="p-2 text-sm">Files</div>,
              <div className="p-2 text-sm">Tasks</div>,
              <div className="p-2 text-sm">Projects</div>,
            ]}
          />
        </div>

      </div>
    </section>
    <h1 className=" text-center m-10 text-3xl md:text-5xl font-semibold leading-tight">
          Create and Manage Your Own<br /> <span className="text-purple-600">Projects</span>
    </h1>

      {/* HEADER */}
    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 mb-6">

        {/* ADD NEW */}
        <div
          onClick={() => setShowModal(true)}
          className="bg-gray-200 border border-dashed border-black rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer"
        >
          <div className="text-2xl mb-2">+</div>
          <button>New Project</button>
        </div>
        {projects.map((project) => (
          <div
            key={project._id}
            onClick={() => navigate(`/board/${project._id}`)}
            className="bg-blue-500 rounded-2xl p-6 cursor-pointer hover:bg-blue-400"
          >
            <h2 className="text-white text-xl font-bold">{project.name}</h2>
            <p className="text-white mt-2">
              Open board →
            </p>
          </div>
        ))}

        {projects.length === 0 && (
          <p className="text-gray-500">No projects yet</p>
        )}

      </div>

      {/* CREATE MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl w-[400px]">

            <h2 className="text-xl font-semibold mb-4">
              Create Project
            </h2>

            <input
              type="text"
              placeholder="Project name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
            />

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500"
              >
                Cancel
              </button>

              <button
                onClick={handleCreate}
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Create
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Dashboard;