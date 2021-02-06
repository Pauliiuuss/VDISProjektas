import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  state = {
    active: "",
  };

  componentDidMount() {
    const { data } = this.props;
    if (data) {
      this.handleClick(data[0].id);
    }
  }

  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  handleClick = (id) => {
    this.setState({ active: id });
    this.props.onKindergartenChange(id);
  };

  createKey = (item, column) => {
    return item.id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map((item) => (
          <tr
            className={this.state.active === item.id ? "active" : ""}
            onClick={() => this.handleClick(item.id)}
            key={item.id}
          >
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
