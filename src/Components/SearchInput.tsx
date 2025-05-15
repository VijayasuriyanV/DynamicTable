import React from "react";

interface SearchInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({value, onChange}) => (
  <input
    type="text"
    placeholder="Search Capsules..."
    value={value}
    onChange={onChange}
    className="border border-gray-300 rounded-lg p-3 w-full sm:w-72 shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
  />
);

export default SearchInput;
