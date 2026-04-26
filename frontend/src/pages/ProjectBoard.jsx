import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Board from "../components/Board";

const ProjectBoard = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Navbar />
        <Board />
      </div>
    </div>
  );
};

export default ProjectBoard;