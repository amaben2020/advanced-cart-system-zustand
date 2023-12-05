const Sidebar = ({ categories, brands }) => {
  return (
    <aside className="p-4 border-2 rounded-md">
      {/* TODO: use a dropdown for this, the dummy api doesnt support this */}
      <p> Filters </p>

      <div className="flex flex-col gap-3 mb-4">
        <p>By Category</p>
        {/* The UI should be a dropdown */}
        <div className="flex flex-col items-center gap-3">
          {categories.map((category: string) => (
            <>
              <p> {category} </p>
              <input
                type="checkbox"
                className="w-5 h-5 cursor-pointer accent-green-700"
              />
            </>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* The UI should be a dropdown */}
          <p> Cat B</p>

          <input
            type="checkbox"
            className="w-5 h-5 cursor-pointer accent-green-700"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 mb-4">
        <p>By Brand</p>

        <div className="flex items-center gap-3">
          <p> Apple </p>

          <input
            type="checkbox"
            className="w-5 h-5 cursor-pointer accent-green-700"
          />
        </div>

        <div className="flex items-center gap-3">
          <p> Infinix</p>

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
