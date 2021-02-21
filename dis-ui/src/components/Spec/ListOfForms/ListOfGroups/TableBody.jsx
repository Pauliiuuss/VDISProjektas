import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  state = {
    showInput: "",
    name: "",
    address: "",
  };

  clickConfirm = (item) => {
    let newItem = item;
    newItem.name = this.state.name;
    newItem.address = this.state.address;
    this.props.onAmendKindergarten(item);
    this.setState({ showInput: "" });
  };

  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item.id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;

    if (data && data.length > 0)
      return (
        <tbody>
          {data.map((item) => (
            <tr
              className={this.props.active === item.id ? "active" : ""}
              key={item.id}
            >
              {columns.map((column) => (
                <td key={this.createKey(item, column)}>
                  {this.renderCell(item, column)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      );

    return (
      <tbody>
        <tr>
          <td colSpan="6">
            <p className="m-4 mx-auto" style={{ width: "500px" }}>
              Duomenų bazėje pasinktam darželiui vaikų formų nėra registruota.
            </p>
          </td>
        </tr>
      </tbody>
    );
  }
}

export default TableBody;
