import React, { Component } from "react";
import _ from "lodash";
import LoadingSpan from "../../utils/LoadingSpan";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column === "date") {
      return new Date(item);
    }

    if (column === "time") {
      return new Date(item);
    }

    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return (
      item.id +
      item.date +
      item.time +
      item.user +
      item.action +
      column.path +
      column.label +
      this.generateKey()
    );
  };

  generateKey = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };

  render() {
    const { loading, data, columns } = this.props;

    //Duomenų nerasta

    if (loading)
      return (
        <div
          className="d-flex justify-content-center"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className="spinner-border"
            style={{ width: "3rem", height: "3rem", marginTop: "3rem" }}
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );

    if (data === 0)
      return (
        <tbody>
          <tr>
            <td colSpan="4">
              <p className="m-4 mx-auto" style={{ width: "500px" }}>
                Duomenų bazėje duomenų nerasta.
              </p>
            </td>
          </tr>
        </tbody>
      );

    return (
      <tbody>
        {data.map((item) => (
          <tr key={item.date + item.time + item.action + this.generateKey()}>
            {columns.map((column) => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
