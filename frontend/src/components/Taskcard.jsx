import { useState } from "react";
import API from "../api";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { useDraggable } from "@dnd-kit/core";

const TaskCard = ({ task, refreshTasks }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  const [open, setOpen] = useState(false);

  // 🔥 DELETE FUNCTION
  const handleDelete = async () => {
    try {
      await API.delete(`/tasks/${task._id}`);
      refreshTasks(); // ✅ re-fetch tasks
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-[#0f172a] border border-white/10 p-4 rounded-xl shadow-md hover:shadow-lg transition"
    >
      {/* DRAG HANDLE */}
      <div
        {...listeners}
        {...attributes}
        className="cursor-grab text-xs text-gray-400 mb-2"
      >
        drag
      </div>

      {/* TITLE */}
      <h3 className="text-white font-semibold text-2xl">
        {task.title}
      </h3>

      

      {/* ASSIGNED USER */}
      {task.assignedTo && (
        <p className="text-lg text-blue-400 mt-2">
          Assigned: {task.assignedTo.name || "User"}
        </p>
      )}
      {/* DESCRIPTION */}
      <p className="text-gray-400 text-lg mt-1">
        {task.description}
      </p>
      {/* DELETE BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="mt-3 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
      >
        Delete
      </button>

      {/* CONFIRM DELETE MODAL */}
      <ConfirmDeleteModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default TaskCard;