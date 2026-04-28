import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

const Column = ({ status, tasks, refreshTasks }) => {
  const { setNodeRef } = useDroppable({ id: status });

  const filtered = tasks.filter((t) => t.status === status);

  // 🎨 STATUS COLORS (soft + modern)
  const statusStyles = {
    "todo": "bg-gray-700/40 text-gray-200",
    "in-progress": "bg-blue-500/20 text-blue-300",
    "review": "bg-yellow-500/20 text-yellow-300",
    "done": "bg-green-500/20 text-green-300",
  };

  return (
    <div
      ref={setNodeRef}
      className="
        bg-[#1e293b]/70
        backdrop-blur-md
        border border-white/10
        rounded-2xl
        p-4
        min-h-[400px]
        shadow-lg
        flex flex-col
      "
    >
      {/* HEADER */}
      <div
        className={`
          ${statusStyles[status]}
          px-3 py-2
          rounded-lg
          text-center
          font-semibold
          mb-4
          capitalize
          tracking-wide
        `}
      >
        {status}
      </div>

      {/* TASKS */}
      <div className="space-y-3 flex-1">
        {filtered.length === 0 ? (
          <p className="text-gray-400 text-sm text-center mt-10">
            No tasks
          </p>
        ) : (
          filtered.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              refreshTasks={refreshTasks}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Column;