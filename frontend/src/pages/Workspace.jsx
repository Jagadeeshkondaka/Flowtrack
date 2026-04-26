import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getWorkspaces,
  createWorkspace,
  inviteMembers,
} from "../workspaceService";

const Workspace = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [emails, setEmails] = useState("");

  const navigate = useNavigate();

  // FETCH WORKSPACES
  useEffect(() => {
    const fetchData = async () => {
      const res = await getWorkspaces();
      setWorkspaces(res.data);
    };
    fetchData();
  }, []);

  // CREATE WORKSPACE
  const handleCreate = async () => {
    try {
      const res = await createWorkspace({
        name,
        members: emails.split(",").map((e) => e.trim()),
      });

      setWorkspaces([...workspaces, res.data]);
      setShowModal(false);
      setName("");
      setEmails("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen">


      <section className="relative h-[350px] flex items-center justify-center text-center text-white overflow-hidden">

      {/* BACKGROUND GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-purple-600 to-pink-500" />

  
          <div className="relative z-10">

          
            <div className="absolute left-6 top-6 text-sm font-semibold opacity-90">
            </div>
            <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
              Amazon WorkSpaces <br />
              applications
            </h1>
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-5 py-2 rounded-md m-8"
            >
              Create Workspace
            </button>
          </div>

    </section>
    <h1 className="text-3xl font-bold text-center m-10 py-2 border-b border-blue-600">Your Workspaces</h1>
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 ">
        <div className="bg-gray-200 border border-dashed border-black rounded-2xl p-6 flex flex-col items-center justify-center text-gray-400 hover:bg-white/5 cursor-pointer transition"
          onClick={()=>setShowModal(true)}
        >

          <div className="w-12 h-12 flex items-center justify-center rounded-full border border-dashed border-gray-500 text-xl mb-3">
            +
          </div>

          <button className="">New workspace</button>
        </div>

        {workspaces.map((ws) => (
          <div
            key={ws._id}
            onClick={() => navigate(`/projects/${ws._id}`)}
            className="bg-blue-500 border border-black rounded-2xl p-6 hover:bg-blue-400 transition backdrop-blur-lg"
          >
            <h2 className="text-white-400  text-xl font-bold capitalize mt-2">{ws.name}</h2>

            <p className="text-white-500 text-lg mt-2">
              {ws.members.length} members
            </p>
            <span
                className="text-xs px-3 py-1 mt-6 rounded-full capitalize rounded-lg  bg-green-200"
            >Active
            </span>
          </div>
        ))}

      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl w-[400px]">

            <h2 className="text-xl font-semibold mb-4">
              Create Workspace
            </h2>

            {/* NAME */}
            <input
              type="text"
              placeholder="Workspace name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
            />

            {/* MEMBERS */}
            <input
              type="text"
              placeholder="Invite members (comma separated emails)"
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              className="w-full border px-3 py-2 rounded-md mt-3"
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

export default Workspace;