import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DndContext, closestCenter } from "@dnd-kit/core";
import Column from "../components/Column";
import TaskModal from "../components/TaskModel";
import CommentsSection from "../pages/CommentsSection";
import API from "../api";

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
    <div className="p-6 bg-gray-50 min-h-screen">
      

      <h1 className="text-2xl font-semibold mb-6">Board</h1>

      {/* CREATE TASK */}
      <button
        onClick={() => setShowTaskModal(true)}
        className="mb-6 bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        + Add Task
      </button>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div className="grid md:grid-cols-4 gap-6">
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