import React from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

const Table = ({
  loading,
  cancelForm,
  enableForm,
  columns,
  data,
  sortColumn,
  onSort,
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
          cancelForm={cancelForm}
          enableForm={enableForm}
          loading={loading}
          columns={columns}
          data={data}
        />
      </table>
    </React.Fragment>
  );
};

export default Table;
