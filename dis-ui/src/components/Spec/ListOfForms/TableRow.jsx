import React from "react";
import _ from "lodash";

const TableRow = (item, columns, createKey) => {
  console.log(item);

  function renderCell(item, column) {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  }

  return (
    <tr key={item.id}>
      {columns.map((column) => (
        <td key={createKey(item, column)}>{renderCell(item, column)}</td>
      ))}
    </tr>
  );
};

export default TableRow;
