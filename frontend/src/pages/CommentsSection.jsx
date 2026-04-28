import { useEffect, useState } from "react";
import API from "../api";
import FallingText from "../components/FallingText";

const CommentsPage = ({ tasks }) => {
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 Fetch comments
  useEffect(() => {
    if (!selectedTaskId) {
      setComments([]);
      return;
    }

    const fetchComments = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/comments/${selectedTaskId}`);
        setComments(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [selectedTaskId]);

  // 🔥 Add comment
  const handleAddComment = async () => {
    if (!text.trim() || !selectedTaskId) return;

    try {
      const res = await API.post("/comments", {
        taskId: selectedTaskId,
        text,
      });

      setComments((prev) => [...prev, res.data]);
      setText("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="px-16 py-20 space-y-20">

      {/* 🔥 HERO SECTION */}
      <div className="grid md:grid-cols-2 items-center gap-10">

        {/* LEFT SIDE */}
        <div>
          <h1 className="text-5xl font-bold mb-4">
            Task Comments Dashboard
          </h1>

          <p className="text-gray-600 mb-6">
            Manage discussions, track updates, and collaborate with your team.
            <br />
            Select a task and start interacting instantly.
          </p>

          <select
            value={selectedTaskId}
            onChange={(e) => setSelectedTaskId(e.target.value)}
            className="w-2/3 border p-3 bg-blue-600 text-white rounded-lg shadow-sm"
          >
            <option value="">Select Task</option>
            {tasks.map((task) => (
              <option key={task._id} value={task._id}>
                {task.title}
              </option>
            ))}
          </select>
        </div>

        {/* RIGHT SIDE - FALLING TEXT */}
        <div className="h-[260px] bg-gray-200 m-6 flex items-center justify-center rounded-xl overflow-hidden">
          <FallingText
            text={`Collaborate faster Share ideas Track progress Build together`}
            highlightWords={["Collaborate", "Track", "Build"]}
            trigger="hover"
            gravity={0.4}   // 🔥 slower & controlled
            fontSize="1.6rem"
          />
        </div>
      </div>

      {/* 🔥 COMMENT SECTION */}
      {selectedTaskId && (
        <div className="grid md:grid-cols-2 gap-6">

          {/* ✏️ WRITE COMMENT BOX */}
          <div className="bg-gray-300 p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4">
              Write a Comment
            </h2>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write your thoughts..."
              className="w-full border bg-gray-200 p-3 rounded-lg h-[120px]"
            />

            <button
              onClick={handleAddComment}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Post Comment
            </button>
          </div>

          {/* 💬 SHOW COMMENTS BOX */}
          <div className="bg-gray-300 p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-4">
              Comments
            </h2>

            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {loading ? (
                <p className="text-gray-400 text-sm">Loading...</p>
              ) : comments.length === 0 ? (
                <p className="text-gray-400 text-sm">
                  No comments yet
                </p>
              ) : (
                comments.map((c) => (
                  <div
                    key={c._id}
                    className="bg-gray-100 p-3 rounded-lg text-sm"
                  >
                    {c.text}
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default CommentsPage;