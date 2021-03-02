import React, { Component } from "react";
import _ from "lodash";
import ParentService from "../../../services/parent.service";

class TableBody extends Component {
  state = {
    showInput: "",
    name: "",
    capasity: "",
    age: "",
    appStatus: {
      registrationClosed: true,
      specelistsDisabled: true,
    },
  };

  componentDidMount = () => {
    ParentService.appStatus().then((response) => {
      console.log(response);
      this.setState({ appStatus: response.data });
    });
  };

  clickAmend = (item) => {
    this.setState({
      showInput: item.id,
      name: item.name,
      capasity: item.capasity,
      age: item.age,
    });
  };

  onInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value, message: "" });
  };

  clickConfirm = (item) => {
    let newItem = item;
    newItem.name = this.state.name;
    newItem.capasity = this.state.capasity;
    newItem.age = this.state.age;
    this.props.onAmendGroup(item);
    this.setState({ showInput: "" });
  };

  renderCell = (item, column) => {
    if (column.label === "" && item.id === this.state.showInput)
      return (
        <div className="row">
          <div className="col-5">
            <button
              onClick={() => this.clickConfirm(item)}
              className="btn btn-info btn-md"
            >
              <i className="fa fa-check" aria-hidden="true"></i>
            </button>
          </div>
          <div className="col-5">
            <button
              onClick={() =>
                this.setState({ showInput: "", name: "", address: "" })
              }
              className="btn btn-danger btn-md"
            >
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      );
    if (column.label === "" && !this.state.appStatus.specelistsDisabled)
      return (
        <button
          onClick={() => this.clickAmend(item)}
          className="btn btn-secondary btn-sm"
        >
          Redaguoti
        </button>
      );
    if (item.id === this.state.showInput && column.path === "age") {
      const name = column.path;
      return (
        <select
          value={this.state[name]}
          name={name}
          onChange={this.onInputChange}
          className="form-control"
          id={name}
        >
          <option id="2 iki 3" value="2 iki 3">
            2 iki 3
          </option>
          <option id="3 iki 6" value="3 iki 6">
            3 iki 6
          </option>
        </select>
      );
    }

    if (item.id === this.state.showInput) {
      const name = column.path;
      return (
        <input
          onChange={this.onInputChange}
          value={this.state[name]}
          name={name}
          type="text"
          className="form-control"
          placeholder={column.label}
        />
      );
    }
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
