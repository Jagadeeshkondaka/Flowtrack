import { useState, useEffect } from "react";
import API from "../api";

const TaskModal = ({ projectId, onClose, onCreate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // 🔥 NEW STATES
  const [projectMembers, setProjectMembers] = useState([]);
  const [assignedTo, setAssignedTo] = useState("");

  // 🔥 FETCH PROJECT MEMBERS
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await API.get(`/projects/${projectId}/members`);
        setProjectMembers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (projectId) fetchMembers();
  }, [projectId]);

  const handleSubmit = async () => {
    if (!title) return;

    try {
      const res = await API.post("/tasks", {
        title,
        description,
        projectId,
        assignedTo, // 🔥 NEW
      });

      onCreate(res.data);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[400px]">

        <h2 className="text-xl font-semibold mb-4">Create Task</h2>

        <input
          placeholder="Title"
          className="w-full border p-2 rounded mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* 🔥 ASSIGN DROPDOWN */}
        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className="w-full border p-2 rounded mt-3"
        >
          <option value="">Assign to</option>

          {projectMembers.map((m) => (
            <option key={m._id} value={m._id}>
              {m.name || m.email}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose}>Cancel</button>

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Create
          </button>
        </div>

      </div>
    </div>
  );
};

export default TaskModal;