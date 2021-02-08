import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  componentDidMount() {
    const { data } = this.props;
    if (data.length > 0) {
      this.handleClick(data[0].id);
    }
  }

  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  handleClick = (id) => {
    this.props.onKindergartenChange(id);
  };

  createKey = (item, column) => {
    return item.id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;

    if (data.length > 0)
      return (
        <tbody>
          {data.map((item) => (
            <tr
              className={
                this.props.active === item.id || +data.length === 1
                  ? "active"
                  : ""
              }
              onClick={() => this.handleClick(item.id)}
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
          <td colSpan="4">
            <p className="m-4 mx-auto" style={{ width: "330px" }}>
              Duomenų bazėje vaikų darželių nėra registruota.
            </p>
          </td>
        </tr>
      </tbody>
    );
  }
}

export default TableBody;
