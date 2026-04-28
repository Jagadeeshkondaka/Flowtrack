import { useEffect, useState } from "react";
import API from "../api";
import FallingText from "../components/FallingText";

const CommentsPage = ({ tasks }) => {
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

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
    <div className="px-16 py-20 space-y-20 bg-[#0f172a] min-h-screen text-white">

      {/* HERO */}
      <div className="grid md:grid-cols-2 items-center gap-10">

        <div>
          <h1 className="text-5xl font-bold mb-4">
            Task Comments Dashboard
          </h1>

          <p className="text-gray-400 mb-6">
            Manage discussions, track updates, and collaborate with your team.
          </p>

          <select
            value={selectedTaskId}
            onChange={(e) => setSelectedTaskId(e.target.value)}
            className="
              w-2/3 p-3 rounded-lg
              bg-[#1e293b]
              border border-white/10
              text-white
              focus:outline-none focus:ring-2 focus:ring-blue-500
            "
          >
            <option value="">Select Task</option>
            {tasks.map((task) => (
              <option key={task._id} value={task._id}>
                {task.title}
              </option>
            ))}
          </select>
        </div>

        {/* Falling text */}
        <div className="h-[260px] bg-[#1e293b]/70 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/10">
          <FallingText
            text={`Collaborate faster Share ideas Track progress Build together`}
            highlightWords={["Collaborate", "Track", "Build"]}
            trigger="hover"
            gravity={0.4}
            fontSize="1.6rem"
          />
        </div>
      </div>

      {/* COMMENT SECTION */}
      {selectedTaskId && (
        <div className="grid md:grid-cols-2 gap-6">

          {/* WRITE */}
          <div className="
            bg-[#1e293b]/70
            backdrop-blur-md
            border border-white/10
            p-6 rounded-xl shadow-lg
          ">
            <h2 className="text-lg font-semibold mb-4 text-blue-400">
              Write a Comment
            </h2>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write your thoughts..."
              className="
                w-full p-3 rounded-lg h-[120px]
                bg-[#0f172a]
                border border-white/10
                text-white
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
            />

            <button
              onClick={handleAddComment}
              className="
                mt-4 w-full
                bg-gradient-to-r from-blue-500 to-indigo-500
                hover:scale-[1.02]
                text-white py-2 rounded-lg
                transition
              "
            >
              Post Comment
            </button>
          </div>

          {/* COMMENTS */}
          <div className="
            bg-[#1e293b]/70
            backdrop-blur-md
            border border-white/10
            p-6 rounded-xl shadow-lg
          ">
            <h2 className="text-lg font-semibold mb-4 text-green-400">
              Comments
            </h2>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">

              {loading ? (
                <p className="text-gray-400 text-sm">Loading...</p>
              ) : comments.length === 0 ? (
                <p className="text-gray-400 text-sm">No comments yet</p>
              ) : (
                comments.map((c) => (
                  <div
                    key={c._id}
                    className="
                      bg-[#0f172a]
                      border border-white/10
                      p-3 rounded-lg text-sm
                      hover:bg-[#111827]
                      transition
                    "
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