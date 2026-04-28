import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import CardSwap, { Card } from "../components/CardSwap";
import Counter from "../components/Counter";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 text-gray-900">
      <Navbar />

      {/* HERO */}
      <section className="text-center py-24 px-6 inset-0 bg-gradient-to-r from-purple-700 via-purple-600 to-pink-500">
        <h1 className="text-5xl font-bold">
          Build, track, and deliver projects faster
        </h1>

        <p className="mt-6 text-white-500">
          FlowTrack helps teams plan, collaborate, and ship work efficiently.
        </p>

        <button
          onClick={() => navigate("/register")}
          className="mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white"
        >
          Get Started →
        </button>
      </section>

      {/* 🔥 FIXED SECTION */}
      <section className="bg-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">

          {/* LEFT */}
          <div className="flex justify-center">
            <div className="w-[450px] h-[260px] overflow-hidden">
              <CardSwap
                width={400}
                height={220}
                cardDistance={40}
                verticalDistance={40}
              >
                <Card className="bg-black text-white flex items-center justify-center text-xl">
                  Workspaces
                </Card>
                <Card className="bg-gray-800 text-white flex items-center justify-center text-xl">
                  Projects
                </Card>
                <Card className="bg-gray-700 text-white flex items-center justify-center text-xl">
                  Tasks
                </Card>
                <Card className="bg-gray-600 text-white flex items-center justify-center text-xl">
                  Comments
                </Card>
                <Card className="bg-gray-500 text-white flex items-center justify-center text-xl">
                  Members
                </Card>
              </CardSwap>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <h2 className="text-5xl font-bold leading-tight">
              The ultimate toolkit for designers & teams
            </h2>

            <p className="mt-6 text-gray-600 text-lg">
              Everything you need to create, prototype, and collaborate —
              all in one platform.
            </p>
          </div>

        </div>
      </section>
       <section className="bg-[#f5f5f7] py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

          <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition">
            <div className="bg-purple-100 rounded-2xl p-6 flex items-center justify-center h-48">
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe"
                className="rounded-xl w-full h-full object-cover"
              />
            </div>

            <h3 className="mt-6 text-xl font-semibold">Kanban Boards</h3>
            <p className="mt-2 text-gray-600">
              Drag and drop tasks across stages with a smooth workflow experience.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition">
            <div className="bg-yellow-100 rounded-2xl p-6 flex items-center justify-center h-48">
              <img
                src="https://images.unsplash.com/photo-1558655146-9f40138edfeb"
                className="rounded-xl w-full h-full object-cover"
              />
            </div>

            <h3 className="mt-6 text-xl font-semibold">Smart Task Tracking</h3>
            <p className="mt-2 text-gray-600">
              Assign tasks, track progress, and meet deadlines with ease.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-md transition">
            <div className="bg-blue-100 rounded-2xl p-6 flex items-center justify-center h-48">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
                className="rounded-xl w-full h-full object-cover"
              />
            </div>

            <h3 className="mt-6 text-xl font-semibold">Real-time collaboration</h3>
            <p className="mt-2 text-gray-600">
              Work seamlessly with your team, get instant feedback.
            </p>
          </div>

        </div>
      </section>
      <section className=" text-black py-20 px-6">
  <div className="max-w-7xl mx-auto text-center">

    {/* Heading */}
    <h2 className="text-4xl font-bold">
      Trusted by teams worldwide
    </h2>

    <p className="mt-4 text-gray-800">
      Thousands of teams use FlowTrack to manage projects efficiently.
    </p>

    {/* Counters */}
    <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-10">

      <div className="flex flex-col items-center">
        <span className="text-4xl font-bold">
          <Counter value={10000} />
        </span>
        <span className="mt-2 text-gray-400">Active Users</span>
      </div>

      <div className="flex flex-col items-center">
        <span className="text-4xl font-bold">
          <Counter value={25000} />
        </span>
        <span className="mt-2 text-gray-400">Projects Created</span>
      </div>

      <div className="flex flex-col items-center">
        <span className="text-4xl font-bold">
          <Counter value={500000} />
        </span>
        <span className="mt-2 text-gray-400">Tasks Completed</span>
      </div>

      <div className="flex flex-col items-center">
        <span className="text-4xl font-bold">
          <Counter value={1200} />
        </span>
        <span className="mt-2 text-gray-400">Teams</span>
      </div>

    </div>

  </div>
</section>
  
      {/* FOOTER */}
      <footer className="bg-[#0b0014] text-gray-300 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">

          <div>
            <h2 className="text-white text-xl font-semibold">Flowtrack</h2>
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
          © 2026 Flowtrack. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;