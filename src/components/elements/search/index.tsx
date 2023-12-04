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
      className="w-[250px] p-2 border rounded-md mb-4"
    />
  );
};

export default Search;
