import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DndContext, closestCenter } from "@dnd-kit/core";
import Column from "../components/Column";
import TaskModal from "../components/TaskModel";
import CommentsSection from "../pages/CommentsSection";
import API from "../api";
import Navbar from "./Navbar";
import RotatingText from "./RotatingText";

const statuses = ["todo", "in-progress", "review", "done"];

const Board = () => {
  const { projectId } = useParams();

  const [tasks, setTasks] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);

  // 🔥 Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await API.get(`/tasks/${projectId}`);
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTasks();
  }, [projectId]);

  // 🔥 Drag update
  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    setTasks((prev) =>
      prev.map((t) =>
        t._id === taskId ? { ...t, status: newStatus } : t
      )
    );

    try {
      await API.patch(`/tasks/${taskId}/status`, {
        status: newStatus,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className=" bg-gray-200 min-h-screen">
      <Navbar/>
      <section className="relative h-[350px] flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-purple-600 to-pink-500" />

        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Flowtrack Project <br /> Boards
          </h1>

          <button
            onClick={() => setShowTaskModal(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded-md mt-6"
          >
            + Add Task
          </button>
        </div>
      </section>
        <section className=" py-32 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-around">

        {/* LEFT SIDE */}
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            Drag & Drop your{" "}
            <span className="text-purple-600">
              tasks
            </span>{" "}
            with Kanban boards
          </h1>

          <p className="mt-4 text-gray-600 text-lg">
            Manage your workflow efficiently by organizing tasks into
            customizable boards. Track progress, collaborate, and deliver faster.
          </p>

          
        </div>

        {/* RIGHT SIDE - ROTATING TEXT */}
        <div className="flex justify-center items-center">
          <RotatingText
            texts={["Tasks", "Projects", "Teams", "Workflows"]}
            mainClassName="text-4xl md:text-5xl font-bold text-white bg-purple-600 px-6 py-3 rounded-xl shadow-lg"
            staggerFrom="last"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-120%", opacity: 0 }}
            staggerDuration={0.03}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            rotationInterval={2000}
          />
        </div>

      </div>
    </section>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="grid md:grid-cols-4 gap- px-8 py-8 gap-8">
          {statuses.map((status) => (
            <Column
              key={status}
              status={status}
              tasks={tasks}
            />
          ))}
        </div>
      </DndContext>

      {/* TASK MODAL */}
      {showTaskModal && (
        <TaskModal
          projectId={projectId}
          onClose={() => setShowTaskModal(false)}
          onCreate={(newTask) => setTasks([...tasks, newTask])}
        />
      )}

      {/* 🔥 COMMENTS SECTION (BOTTOM) */}
      <CommentsSection tasks={tasks} />

    </div>
  );
};

export default Board;