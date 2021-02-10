import React, { useState } from "react";
import _ from "lodash";

const TableRow = (active, handleClick, item, columns, createKey) => {
  const [buttonState, setButtonState] = useState(true);

  console.log(item);

  function renderCell(item, column) {
    if (column.content) return column.content(item);
    if (column.label === "" && !buttonState)
      return (
        <button
          onClick={setButtonState(true)}
          className="btn btn-warning btn-sm"
        >
          Pataisyti
        </button>
      );
    if (column.label === "" && buttonState)
      return (
        <button onClick={setButtonState(false)} className="btn btn-info btn-sm">
          Patvirtinti
        </button>
      );
    return _.get(item, column.path);
  }

  return (
    <tr
      className={active === item.id ? "active" : ""}
      onClick={() => handleClick(item.id)}
      key={item.id}
    >
      {columns.map((column) => (
        <td key={createKey(item, column)}>{renderCell(item, column)}</td>
      ))}
    </tr>
  );
};

export default TableRow;
