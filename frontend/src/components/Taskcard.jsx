import { useDraggable } from "@dnd-kit/core";

const TaskCard = ({ task }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-gray-100 p-4 rounded-lg shadow"
    >
      {/* DRAG HANDLE */}
      <div
        {...listeners}
        {...attributes}
        className="cursor-grab text-xs text-gray-400 mb-2"
      >
        drag
      </div>

      <h3 className="font-medium">{task.title}</h3>
      <p className="text-sm text-gray-500">{task.description}</p>
    </div>
  );
};

export default TaskCard;