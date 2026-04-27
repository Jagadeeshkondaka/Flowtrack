import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BounceCards from "../components/BounceCards";
import Navbar from "../components/Navbar"
import {
  getWorkspaces,
  createWorkspace
} from "../workspaceService";

const Workspace = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [emails, setEmails] = useState("");

  const navigate = useNavigate();

  const images = [
    "https://plus.unsplash.com/premium_photo-1661521272287-692fdc99db74?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVvcGxlJTIwd3Jva2lubmclMjB3aXRoJTIwdGhlJTIwbGFwdG9wfGVufDB8fDB8fHww",
    "https://plus.unsplash.com/premium_photo-1690303193705-eec163806599?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVvcGxlJTIwd3Jva2lubmclMjB3aXRoJTIwdGhlJTIwbGFwdG9wfGVufDB8fDB8fHww",
    "https://media.istockphoto.com/id/2233472302/photo/business-team-analyzing-data-on-laptop-with-charts-and-graphs-selective-focus.webp?a=1&b=1&s=612x612&w=0&k=20&c=IkOhX2Ha3ovhmfXKXmA5G6NoFKb2GUo_zNv_uFj3EXw=",
    "https://picsum.photos/700/700?grayscale",
    "https://plus.unsplash.com/premium_photo-1690303193705-eec163806599?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVvcGxlJTIwd3Jva2lubmclMjB3aXRoJTIwdGhlJTIwbGFwdG9wfGVufDB8fDB8fHww"
  ];

  const transformStyles = [
    "rotate(5deg) translate(-150px)",
    "rotate(0deg) translate(-70px)",
    "rotate(-5deg)",
    "rotate(5deg) translate(70px)",
    "rotate(-5deg) translate(150px)"
  ];

  useEffect(() => {
    const fetchData = async () => {
      const res = await getWorkspaces();
      setWorkspaces(res.data);
    };
    fetchData();
  }, []);

  const handleCreate = async () => {
    const res = await createWorkspace({
      name,
      members: emails.split(",").map((e) => e.trim())
    });

    setWorkspaces([...workspaces, res.data]);
    setShowModal(false);
    setName("");
    setEmails("");
  };

  return (
    <div className="min-h-screen">
      <Navbar/>

      {/* HERO */}
      <section className="relative h-[350px] flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-purple-600 to-pink-500" />

        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Flowtrack WorkSpace <br /> applications
          </h1>

          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded-md mt-6"
          >
            Create Workspace
          </button>
        </div>
      </section>

      {/* ✅ Bounce Cards */}
      <div className="flex justify-center mt-10">
        <BounceCards
          images={images}
          containerWidth={500}
          containerHeight={250}
          animationDelay={1}
          animationStagger={0.08}
          easeType="elastic.out(1, 0.5)"
          transformStyles={transformStyles}
          enableHover={false}
        />
      </div>

      {/* TITLE */}
      <h1 className=" text-center m-10 text-3xl md:text-5xl font-semibold leading-tight">
        Create Your Own<br /> Workspaces
      </h1>

      {/* WORKSPACE GRID */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 mb-6">

        {/* ADD NEW */}
        <div
          onClick={() => setShowModal(true)}
          className="bg-gray-200 border border-dashed border-black rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer"
        >
          <div className="text-2xl mb-2">+</div>
          <button>New workspace</button>
        </div>

        {/* LIST */}
        {workspaces.map((ws) => (
          <div
            key={ws._id}
            onClick={() => navigate(`/projects/${ws._id}`)}
            className="bg-blue-500 rounded-2xl p-6 cursor-pointer hover:bg-blue-400"
          >
            <h2 className="text-white text-xl font-bold">
              {ws.name}
            </h2>

            <p className="text-white mt-2">
              {ws.members.length} members
            </p>
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

            <input
              type="text"
              placeholder="Workspace name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
            />

            <input
              type="text"
              placeholder="Invite emails"
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              className="w-full border px-3 py-2 rounded-md mt-3"
            />

            <div className="flex justify-end gap-3 mt-5">
              <button onClick={() => setShowModal(false)}>
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