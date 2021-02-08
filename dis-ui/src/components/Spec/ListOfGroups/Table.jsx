import React from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import AddGroup from "./AddGroup";

const Table = ({
  columns,
  data,
  sortColumn,
  onSort,
  onAddGroup,
  successful,
  message,
}) => {
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody columns={columns} data={data} />
      <AddGroup
        onAddGroup={onAddGroup}
        successful={successful}
        message={message}
      />
    </table>
  );
};

export default Table;
