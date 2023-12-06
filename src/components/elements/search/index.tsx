import { ChangeEvent, KeyboardEvent } from "react";

const Search = ({
  handleChange,
  handleKeyDown,
  value,
}: {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: KeyboardEvent<HTMLElement>) => void;
  value: string;
}) => {
  return (
    <input
      value={value}
      onChange={handleChange}
      type="search"
      onKeyDown={handleKeyDown}
      className="w-full p-2 mb-4 border-2 rounded-md placeholder:italic"
      placeholder="Search for products..."
    />
  );
};

export default Search;
