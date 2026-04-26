import { useEffect, useState } from "react";
import API from "../api";

const CommentModal = ({ task, onClose }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      const res = await API.get(`/comments/${task._id}`);
      setComments(res.data);
    };
    fetchComments();
  }, [task]);

  const handleAdd = async () => {
    const res = await API.post("/comments", {
      taskId: task._id,
      text,
    });

    setComments([...comments, res.data]);
    setText("");
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[500px]">

        <h2 className="text-xl font-semibold mb-4">{task.title}</h2>

        <div className="space-y-2 max-h-[200px] overflow-y-auto">
          {comments.map((c) => (
            <div key={c._id} className="bg-gray-100 p-2 rounded">
              {c.text}
            </div>
          ))}
        </div>

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border p-2 rounded mt-3"
          placeholder="Add comment..."
        />

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose}>Close</button>
          <button
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>

      </div>
    </div>
  );
};

export default CommentModal;