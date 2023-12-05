const Sidebar = ({ categories, brands }) => {
  console.log(brands);
  return (
    <aside className="p-4 border-2 rounded-md">
      {/* TODO: use a dropdown for this, the dummy api doesnt support this */}
      <p> Filters </p>

      <div className="flex flex-col gap-3 mb-4">
        <p>By Category</p>
        {/* The UI should be a dropdown */}
        <div className="flex flex-col gap-3">
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

        {/* <div className="flex flex-col gap-3">
          {brands.map((brand: string) => (
            <>
              <p> {brand} </p>
              <input
                type="checkbox"
                className="w-5 h-5 cursor-pointer accent-green-700"
              />
            </>
          ))}
        </div> */}
      </div>
    </aside>
  );
};

export default Sidebar;
