import React from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

const Table = ({ columns, data, sortColumn, onSort, onKindergartenChange }) => {
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody
        columns={columns}
        data={data}
        onKindergartenChange={onKindergartenChange}
      />
    </table>
  );
};

export default Table;
