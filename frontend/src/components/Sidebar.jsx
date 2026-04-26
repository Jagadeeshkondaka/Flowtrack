const Sidebar = () => {
  return (
    <div className="w-60 h-screen bg-gray-900 text-white p-5">
      <h1 className="text-xl font-bold mb-6">FlowTrack</h1>

      <div className="space-y-3 text-sm">
        <p className="hover:text-gray-300 cursor-pointer">Dashboard</p>
        <p className="hover:text-gray-300 cursor-pointer">Projects</p>
      </div>
    </div>
  );
};

export default Sidebar;