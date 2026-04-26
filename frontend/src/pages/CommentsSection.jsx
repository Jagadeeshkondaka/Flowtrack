
import { useEffect, useState } from "react";
import API from "../api";

const CommentsSection = ({ tasks }) => {
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  // 🔥 Fetch comments
  useEffect(() => {
    if (!selectedTaskId) return;

    const fetchComments = async () => {
      try {
        const res = await API.get(`/comments/${selectedTaskId}`);
        setComments(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchComments();
  }, [selectedTaskId]);

  // 🔥 Add comment
  const handleAddComment = async () => {
    if (!text || !selectedTaskId) return;

    try {
      const res = await API.post("/comments", {
        taskId: selectedTaskId,
        text,
      });

      setComments([...comments, res.data]);
      setText("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="mt-8 bg-white border-t p-6 rounded-xl">

      <h2 className="text-lg font-semibold mb-4">Comments</h2>

      {/* SELECT TASK */}
      <select
        value={selectedTaskId}
        onChange={(e) => setSelectedTaskId(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      >
        <option value="">Select Task</option>

        {tasks.map((task) => (
          <option key={task._id} value={task._id}>
            {task.title}
          </option>
        ))}
      </select>

      {/* COMMENTS LIST */}
      {selectedTaskId && (
        <div className="space-y-2 max-h-[200px] overflow-y-auto">
          {comments.length === 0 ? (
            <p className="text-gray-500 text-sm">No comments yet</p>
          ) : (
            comments.map((c) => (
              <div
                key={c._id}
                className="bg-gray-100 p-2 rounded text-sm"
              >
                {c.text}
              </div>
            ))
          )}
        </div>
      )}

      {/* INPUT */}
      {selectedTaskId && (
        <div className="flex gap-2 mt-4">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 border p-2 rounded"
          />

          <button
            onClick={handleAddComment}
            className="bg-blue-600 text-white px-4 rounded"
          >
            Send
          </button>
        </div>
      )}

    </div>
  );
};

export default CommentsSection;