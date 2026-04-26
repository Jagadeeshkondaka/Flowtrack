import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

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
    <div className="min-h-screen bg-gray-50 px-8 py-10">
    <section class="relative flex flex-col items-center justify-center text-center py-24 px-6 
      bg-gradient-to-b from-black via-[#0a0a0f] to-[#111827] overflow-hidden">

    <span class="text-xs tracking-widest bg-gray-800/70 px-5 py-1 rounded-full mb-6">
      JOIN THE SPEED REVOLUTION
    </span>

    <h1 class="text-4xl md:text-6xl font-bold leading-tight">
      Manage your team projects
    </h1>

    <p class="text-2xl md:text-3xl italic text-purple-400 mt-3 mb-6">
      Like a Ace...
    </p>

 
    <button class="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 rounded-full 
      font-medium shadow-lg hover:scale-105 transition">
      Get Started →
    </button>

    
    <div class="absolute w-[500px] h-[500px] bg-purple-700/20 blur-[120px] rounded-full bottom-0"></div>

  </section>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-semibold">Projects</h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-md"
        >
          + New Project
        </button>
      </div>

      {/* PROJECT GRID */}
      <div className="grid md:grid-cols-3 gap-6">

        {projects.map((project) => (
          <div
            key={project._id}
            onClick={() => navigate(`/board/${project._id}`)}
            className="bg-white p-6 rounded-xl border hover:shadow-md cursor-pointer"
          >
            <h2 className="text-xl font-semibold">{project.name}</h2>
            <p className="text-gray-500 text-sm mt-2">
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