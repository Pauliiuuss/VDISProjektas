import React from "react";

const SearchBoxForlogs = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      name="query"
      className="form-control"
      placeholder={placeholder ? placeholder : "Paieška..."}
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBoxForlogs;
