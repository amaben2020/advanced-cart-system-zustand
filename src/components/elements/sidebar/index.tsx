import FilterDropdown from "../filter";

const Sidebar = ({
  categories,
  brands,
  handleCategoryFilter,
  selectedCategory,
  handleSortDirection,
  handleSortBy,
}: any) => {
  return (
    <aside className="p-3 border-2 rounded-md min-h-[50vh]">
      {/* TODO: use a dropdown for this, the dummy api doesnt support this */}
      <p>
        {" "}
        Filters{selectedCategory.length > 0 && ":"}{" "}
        <span className="italic">
          {selectedCategory.length > 0 &&
            selectedCategory.map((category: string) => category).join(", ")}
        </span>
      </p>

      <div className="flex justify-between my-4 gap-x-3">
        <div>
          <label htmlFor=""> Sort By: </label>
          <select
            name=""
            id=""
            className="w-full p-3 border-2 rounded-lg"
            onChange={handleSortBy}
          >
            <option value="title">Title</option>
            <option value="price">Price</option>
          </select>
        </div>

        <div>
          <label htmlFor=""> Sort Direction: </label>
          <select
            name=""
            id=""
            className="w-full p-3 border-2 rounded-lg"
            onChange={handleSortDirection}
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>
      </div>

      <FilterDropdown
        title="By Category"
        handleCategoryFilter={handleCategoryFilter}
        items={categories}
      />
    </aside>
  );
};

export default Sidebar;
