import React from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

const Table = ({ columns, data, appStatus }) => {
  return (
    <table className="table">
      <TableHeader columns={columns} />
      <TableBody appStatus={appStatus} columns={columns} data={data} />
    </table>
  );
};

export default Table;
