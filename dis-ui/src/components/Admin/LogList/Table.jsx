import React from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

const Table = ({ columns, data, sortColumn, onSort }) => {
  return (
    <table className="table table-sm">
      <caption className={"ml-1"} style={{ captionSide: "top" }}>
        Nepasirinkus datos sąrašo rikiavimas pagal laiką negalimas
      </caption>
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody columns={columns} data={data} />
    </table>
  );
};

export default Table;
