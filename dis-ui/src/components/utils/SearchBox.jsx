import React from "react";

const SearchBox = ({ placeholder, value, onChange }) => {
  return (
    <input
      type="text"
      name="query"
      className="form-control my-3"
      placeholder={placeholder ? placeholder : "Paieška..."}
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
