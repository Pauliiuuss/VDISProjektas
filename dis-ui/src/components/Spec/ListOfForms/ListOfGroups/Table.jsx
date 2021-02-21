import React from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

const Table = ({ columns, data, sortColumn, onSort }) => {
  return (
    <React.Fragment>
      <table className="table">
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody columns={columns} data={data} />
      </table>
    </React.Fragment>
  );
};

export default Table;
