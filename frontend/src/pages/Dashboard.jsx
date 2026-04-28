import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import Navbar from "../components/Navbar";
import Folder from "../components/Folder";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";

const Dashboard = () => {
  const { workspaceId } = useParams();
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(null);

  // FETCH PROJECTS
  const fetchProjects = async () => {
    try {
      const res = await API.get(`/projects/${workspaceId}`);
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // FETCH USERS
  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (workspaceId) fetchProjects();
    fetchUsers();
  }, [workspaceId]);

  // DELETE PROJECT
  const handleDelete = async (projectId) => {
    try {
      await API.delete(`/projects/${projectId}`);
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  // CREATE PROJECT
  const handleCreate = async () => {
    try {
      if (!name) return;

      const res = await API.post("/projects", {
        name,
        workspaceId,
        members: selectedMembers,
      });

      setProjects([...projects, res.data]);
      setShowModal(false);
      setName("");
      setSelectedMembers([]);
    } catch (err) {
      console.error(err);
    }
  };

  // ADD MEMBERS
  const handleAddMembers = async () => {
    try {
      await API.patch(`/projects/${selectedProject._id}/members`, {
        members: selectedMembers,
      });

      setShowMemberModal(false);
      setSelectedMembers([]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center text-center py-24 px-6 bg-gradient-to-b from-black via-[#0a0a0f] to-[#111827] overflow-hidden">
        <span className="text-xs tracking-widest bg-gray-300 px-5 py-1 rounded-full mb-6">
          JOIN THE SPEED REVOLUTION
        </span>

        <h1 className="text-4xl md:text-6xl text-white font-bold leading-tight">
          Manage your team projects
        </h1>

        <p className="text-2xl md:text-3xl italic text-purple-400 mt-3 mb-6">
          Like a Ace...
        </p>

        <button className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 rounded-full font-medium shadow-lg hover:scale-105 transition">
          Get Started →
        </button>
      </section>

      {/* INFO SECTION */}
      <section className="bg-gray-200 py-32 px-6 border-b border-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-around gap-2">
          <div className="max-w-lg">
            <h1 className="text-6xl font-bold text-gray-900 leading-tight">
              Manage your Projects smarter
            </h1>

            <p className="mt-4 text-gray-600 text-lg">
              Organize projects, create projects, and collaborate seamlessly.
            </p>
          </div>

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

      {/* HEADER */}
      <h1 className="text-center m-10 text-3xl md:text-5xl font-semibold">
        Create and Manage Your Own <br />
        <span className="text-purple-600">Projects</span>
      </h1>

      {/* PROJECT GRID */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-106">

        {/* CREATE CARD */}
        <div
          onClick={() => setShowModal(true)}
          className="aspect-square border-2 border-dashed border-gray-400 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition"
        >
          <div className="text-3xl mb-2">+</div>
          <p className="text-gray-600">New Project</p>
        </div>

        {/* PROJECT CARDS */}
        {projects.map((project) => (
          <div
            key={project._id}
            onClick={() => navigate(`/board/${project._id}`)}
            className="aspect-square bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl p-5 cursor-pointer flex flex-col justify-center gap-6 shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
          >
            <div>
              <h2 className="text-white text-3xl font-semibold">
                {project.name}
              </h2>

              <p className="text-white/80 text-lg mt-1">
                Open board →
              </p>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(project._id);
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-lg"
              >
                Delete
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProject(project);
                  setShowMemberModal(true);
                }}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded-md text-lg"
              >
                Add
              </button>
            </div>
          </div>
        ))}

      </div> {/* ✅ FIXED: closing grid */}

      {/* DELETE MODAL */}
      <ConfirmDeleteModal
        isOpen={!!open}
        onClose={() => setOpen(null)}
        onConfirm={() => handleDelete(open)}
      />

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

            <select
              multiple
              value={selectedMembers}
              onChange={(e) =>
                setSelectedMembers(
                  [...e.target.selectedOptions].map(o => o.value)
                )
              }
              className="w-full border p-2 mt-3"
            >
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name || u.email}
                </option>
              ))}
            </select>

            <div className="flex justify-end gap-3 mt-5">
              <button onClick={() => setShowModal(false)}>Cancel</button>
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

      {/* ADD MEMBER MODAL */}
      {showMemberModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[400px]">
            <h2 className="text-xl font-semibold mb-4">
              Add Members
            </h2>

            <select
              multiple
              value={selectedMembers}
              onChange={(e) =>
                setSelectedMembers(
                  [...e.target.selectedOptions].map(o => o.value)
                )
              }
              className="w-full border p-2"
            >
              {users.map((u) => (
                <option key={u._id} value={u._id}>
                  {u.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleAddMembers}
              className="bg-green-600 text-white px-4 py-2 mt-4"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;