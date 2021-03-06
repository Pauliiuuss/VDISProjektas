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
  onAmendGroup,
  appStatus,
}) => {
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody columns={columns} data={data} onAmendGroup={onAmendGroup} />
      {!appStatus.specelistsDisabled && (
        <AddGroup
          onAddGroup={onAddGroup}
          successful={successful}
          message={message}
        />
      )}
    </table>
  );
};

export default Table;
