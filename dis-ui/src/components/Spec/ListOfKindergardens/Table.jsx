import React from "react";
import AddElement from "./AddElement";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

const Table = ({
  columns,
  data,
  sortColumn,
  onSort,
  onKindergartenChange,
  onAddKindergarten,
  successful,
  message,
  active,
  onAmendKindergarten,
  appStatus,
}) => {
  return (
    <React.Fragment>
      <table className="table">
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody
          onAmendKindergarten={onAmendKindergarten}
          active={active}
          columns={columns}
          data={data}
          onKindergartenChange={onKindergartenChange}
        />
        {!appStatus.specelistsDisabled && (
          <AddElement
            successful={successful}
            message={message}
            onAddKindergarten={onAddKindergarten}
          />
        )}
      </table>
    </React.Fragment>
  );
};

export default Table;
