import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item.id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.length ? null : (
          <tr>
            <td colSpan="4">
              <p className="m-4 mx-auto" style={{ width: "330px" }}>
                Pasirinktam darželiui grupių nėra registruota.
              </p>
            </td>
          </tr>
        )}
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((column) => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
            <td></td>
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
