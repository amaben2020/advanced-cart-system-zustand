import { uppercaseText } from "@/utils/uppercaseText";
import { useState } from "react";

const FilterDropdown = ({
  items,
  title,
  handleCategoryFilter,
  clearFilters,
  selectedCategory,
}: {
  items: string[];
  title: string;
  handleCategoryFilter: any;
  clearFilters: any;
  selectedCategory: any;
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
                    checked={selectedCategory.includes(category)}
                    onChange={() => handleCategoryFilter(category)}
                    type="checkbox"
                    className="w-5 h-5 border border-gray-400 cursor-pointer accent-green-700"
                  />
                  <p> {uppercaseText(category)} </p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={clearFilters}
            className="flex items-center justify-between w-full p-3 text-center text-white bg-green-700 border rounded-lg"
          >
            Clear Filters{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="text-red-500"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default FilterDropdown;
