import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  state = {
    showInput: "",
    name: "",
    address: "",
  };

  componentDidMount() {
    const { data } = this.props;
    if (data.length > 0) {
      this.handleClick(data[0].id);
    }
  }

  clickAmend = (item) => {
    this.setState({
      showInput: item.id,
      name: item.name,
      address: item.address,
    });
  };

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value, message: "" });
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

  handleClick = (item) => {
    this.props.onKindergartenChange(item);
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
          <td colSpan="5">
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
