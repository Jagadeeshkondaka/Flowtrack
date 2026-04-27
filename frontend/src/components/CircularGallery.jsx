import { motion } from "framer-motion";

export default function CircularGallery() {
  const items = [
    { text: "Workspaces", color: "bg-purple-500" },
    { text: "Projects", color: "bg-blue-500" },
    { text: "Tasks", color: "bg-green-500" },
    { text: "Comments", color: "bg-pink-500" },
    { text: "Members", color: "bg-orange-500" },
  ];

  const radius = 240; // ✅ increased radius = no overlap

  return (
    <div className="flex justify-center items-end h-[350px]">
      <div className="relative w-[700px] h-[300px]">

        {items.map((item, i) => {
          const angle = Math.PI - (i / (items.length - 1)) * Math.PI;

          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);

          return (
            <motion.div
              key={i}
              className="absolute flex items-center justify-center"
              style={{
                left: "50%",
                bottom: "0",
                transform: `translate(-50%, 0) translate(${x}px, ${-y}px)`
              }}
              whileHover={{
                scale: 1.1 // ✅ small scale → no covering others
              }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
            >
              <div
                className={`w-32 h-32 ${item.color} rounded-2xl shadow-lg flex items-center justify-center text-white font-semibold`}
              >
                {item.text}
              </div>
            </motion.div>
          );
        })}

      </div>
    </div>
  );
}