import { useState } from "react";

const FilterDropdown = ({ title }: { title: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen((p) => !p)}
        className="w-full p-6 transition rounded-lg shadow-sm shadow-green-700"
      >
        {title}
      </button>

      {isOpen && <div>SELECTS</div>}
    </>
  );
};

const Sidebar = ({
  categories,
  brands,
  handleCategoryFilter,
  selectedCategory,
}) => {
  return (
    <aside className="p-4 border-2 rounded-md">
      {/* TODO: use a dropdown for this, the dummy api doesnt support this */}
      <p> Filters </p>

      <FilterDropdown title="Category" />

      <div className="flex flex-col gap-3 mb-4">
        <p>By Category</p>

        <div className="flex flex-col gap-3">
          {categories.map((category: string) => (
            <div className="flex items-center gap-x-4" key={category}>
              <input
                // checked={category === selectedCategory}
                onChange={() => handleCategoryFilter(category)}
                type="checkbox"
                className="w-5 h-5 cursor-pointer accent-green-700"
              />
              <p> {category} </p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
