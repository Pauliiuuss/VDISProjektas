import React, { Component } from "react";

// columns: array
// sortColumn: object
// onSort: function

class TableHeader extends Component {
  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th key={column.path || column.key}>{column.label}</th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
