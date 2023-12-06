import { uppercaseText } from "@/utils/uppercaseText";
import { useState } from "react";

const FilterDropdown = ({
  items,
  title,
  handleCategoryFilter,
}: {
  items: string[];
  title: string;
  handleCategoryFilter: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen((p) => !p)}
        className="flex justify-between w-full p-4 my-3 transition border-2 rounded-lg"
      >
        {title}

        {!isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="p-2">
          <div className="flex flex-col gap-3 mb-4">
            <div className="flex flex-col gap-3">
              {items.map((category: string) => (
                <div className="flex items-center gap-x-4" key={category}>
                  <input
                    // checked={category === selectedCategory}
                    onChange={() => handleCategoryFilter(category)}
                    type="checkbox"
                    className="w-5 h-5 border border-gray-400 cursor-pointer accent-green-700"
                  />
                  <p> {uppercaseText(category)} </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
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
    <aside className="p-4 border-2 rounded-md min-h-[50%]">
      {/* TODO: use a dropdown for this, the dummy api doesnt support this */}
      <p>
        {" "}
        Filters{selectedCategory.length > 0 && ":"}{" "}
        <span className="italic">
          {selectedCategory.length > 0 &&
            selectedCategory.map((category: string) => category).join(", ")}
        </span>
      </p>

      <FilterDropdown
        title="By Category"
        handleCategoryFilter={handleCategoryFilter}
        items={categories}
      />
    </aside>
  );
};

export default Sidebar;
