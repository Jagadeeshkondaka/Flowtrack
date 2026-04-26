import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

const Column = ({ status, tasks }) => {
  const { setNodeRef } = useDroppable({ id: status });

  const filtered = tasks.filter((t) => t.status === status);

  return (
    <div
      ref={setNodeRef}
      className="bg-white p-4 rounded-xl border min-h-[400px]"
    >
      <h2 className="font-semibold mb-4 capitalize">{status}</h2>

      <div className="space-y-3">
        {filtered.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;