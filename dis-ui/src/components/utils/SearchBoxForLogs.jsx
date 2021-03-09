import React from "react";

const SearchBoxForlogs = ({ placeholder, value, onChange }) => {
  return (
    <input
      type="text"
      name="query"
      className="form-control"
      placeholder={placeholder ? placeholder : "Paieška..."}
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBoxForlogs;
