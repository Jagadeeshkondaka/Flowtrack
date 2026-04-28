import { useState } from "react";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  const [input, setInput] = useState("");

  if (!isOpen) return null;

  const isValid = input === "DELETE";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-[400px]">

        <h2 className="text-red-600 font-bold mb-2">
          Confirm Delete
        </h2>

        <p className="text-sm mb-3">
          Type <b>DELETE</b> to confirm
        </p>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border w-full p-2 rounded"
        />

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose}>Cancel</button>

          <button
            disabled={!isValid}
            onClick={() => {
              onConfirm();
              onClose();
              setInput("");
            }}
            className={`px-4 py-2 text-white rounded ${
              isValid ? "bg-red-600" : "bg-gray-400"
            }`}
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
};

export default ConfirmDeleteModal;