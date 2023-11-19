const Sidebar = () => {
  return (
    <aside className="p-4 border-2 rounded-md">
      <p> Filters </p>

      <div className="flex flex-col gap-3">
        <p>By Category</p>

        <div className="flex items-center gap-3">
          <p> Cat A </p>

          <input
            type="checkbox"
            className="w-5 h-5 cursor-pointer accent-green-700"
          />
        </div>

        <div className="flex items-center gap-3">
          <p> Cat B</p>

          <input
            type="checkbox"
            className="w-5 h-5 cursor-pointer accent-green-700"
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
