import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  const navigate = useNavigate();
  const logos = [
    "Berlin.",
    "U-Turn",
    "Swiss",
    "KOBE",
    "On_Event",
    "theo",
    "OS",
  ];

  return (
    <div className="bg-white text-gray-900">

      <Navbar />
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-28 overflow-hidden">

        {/* BACKGROUND GLOW */}
        <div className="absolute w-[600px] h-[600px] bg-purple-700 opacity-30 blur-3xl rounded-full top-[-200px]" />
        <div className="absolute w-[500px] h-[500px] bg-blue-600 opacity-20 blur-3xl rounded-full bottom-[-150px]" />

        {/* CONTENT */}
        <div className="relative z-10 max-w-4xl">

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Build, track, and deliver projects faster <br /> deliver projects faster 
          </h1>

          <p className="mt-6 text-gray-300 text-lg max-w-2xl mx-auto">
            FlowTrack helps teams plan, collaborate, and ship work efficiently
            with real-time updates and powerful Kanban boards.
          </p>

          <button
            onClick={() => navigate("/register")}
            className="mt-10 px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:opacity-90 transition font-medium flex items-center gap-2 mx-auto"
          >
            Get Started Now →
          </button>

        </div>
      </section>

      {/* HERO SECTION */}
      

      {/* TRUSTED SECTION */}

        {/* SCROLL CONTAINER */}
       <div className="overflow-hidden bg-gray-100 py-10">

        <div className="flex w-max gap-16 animate-marquee">
          {[...logos, ...logos].map((logo, i) => (
            <span key={i} className="text-gray-500 text-xl font-semibold">
             {logo}
            </span>
          ))}
        </div>

       </div>
             <section className="bg-gray-100 py-16 overflow-hidden">

        <div className="max-w-6xl mx-auto text-center mb-10">
          <h2 className="text-4xl font-bold">
            The ultimate toolkit for designers & teams
          </h2>
          <p className="text-gray-600 mt-4">
            Everything you need to create, prototype, and collaborate - all in one platform.
          </p>
        </div>


      </section>
      <section className="bg-[#f5f5f7] py-20 px-6">
       <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

        {/* CARD 1 */}
        <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition">
          
          {/* TOP UI */}
          <div className="bg-purple-100 rounded-2xl p-6 flex items-center justify-center h-48">
            <img
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe"
              className="rounded-xl w-full h-full object-cover"
            />
          </div>

          <h3 className="mt-6 text-xl font-semibold">
            Kanban Boards
          </h3>

          <p className="mt-2 text-gray-600">
            Drag and drop tasks across stages with a smooth workflow experience.
          </p>
        </div>

        {/* CARD 2 */}
        <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition">
          
          <div className="bg-yellow-100 rounded-2xl p-6 flex items-center justify-center h-48">
            <img
              src="https://images.unsplash.com/photo-1558655146-9f40138edfeb"
              className="rounded-xl w-full h-full object-cover"
            />
          </div>

          <h3 className="mt-6 text-xl font-semibold">
            Smart Task Tracking
          </h3>

          <p className="mt-2 text-gray-600">
            Assign tasks, track progress, and meet deadlines with ease.
          </p>
        </div>

        {/* CARD 3 */}
        <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition">
          
          <div className="bg-blue-100 rounded-2xl p-6 flex items-center justify-center h-48">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
              className="rounded-xl w-full h-full object-cover"
            />
          </div>

          <h3 className="mt-6 text-xl font-semibold">
            Real-time collaboration
          </h3>

          <p className="mt-2 text-gray-600">
            Work seamlessly with your team, get instant feedback.
          </p>
        </div>

       </div>
    </section>

    <footer className="bg-[#0b0014] text-gray-300 mt-20">
  <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">

    <div>
      <h2 className="text-white text-xl font-semibold">TechNova</h2>
      <p className="mt-4 text-sm text-gray-400">
        Building the future with powerful and intuitive tools.
      </p>
    </div>

    <div>
      <h3 className="text-white mb-4">Product</h3>
      <ul className="space-y-2 text-sm">
        <li>Features</li>
        <li>Pricing</li>
        <li>Docs</li>
      </ul>
    </div>

    <div>
      <h3 className="text-white mb-4">Company</h3>
      <ul className="space-y-2 text-sm">
        <li>About</li>
        <li>Careers</li>
        <li>Blog</li>
      </ul>
    </div>

    <div>
      <h3 className="text-white mb-4">Social</h3>
      <ul className="space-y-2 text-sm">
        <li>Twitter</li>
        <li>LinkedIn</li>
        <li>GitHub</li>
      </ul>
    </div>

  </div>

  <div className="border-t border-gray-800 text-center text-sm py-6 text-gray-500">
    © 2026 TechNova. All rights reserved.
  </div>
</footer>

      

    </div>
  );
};

export default Home;