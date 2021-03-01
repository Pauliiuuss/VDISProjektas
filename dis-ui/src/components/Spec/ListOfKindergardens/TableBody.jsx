import React, { Component } from "react";
import _ from "lodash";
import ParentService from "../../../services/parent.service";

class TableBody extends Component {
  state = {
    showInput: "",
    name: "",
    address: "",
    appStatus: {
      registrationClosed: true,
      specelistsDisabled: true,
    },
  };

  componentDidMount() {
    const { data } = this.props;
    if (data.length > 0) {
      this.handleClick(data[0].id);
    }
    ParentService.appStatus().then((response) => {
      console.log(response);
      this.setState({ appStatus: response.data });
    });
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
    if (column.path === "capasity" && item.id === this.state.showInput)
      return (
        <button
          onClick={() => this.clickConfirm(item)}
          className="btn btn-info btn-md"
        >
          Patvirtinti
        </button>
      );
    if (column.label === "" && item.id === this.state.showInput)
      return (
        <button
          onClick={() =>
            this.setState({ showInput: "", name: "", address: "" })
          }
          className="btn btn-danger btn-md"
        >
          Atšaukti
        </button>
      );
    if (column.label === "" && !this.state.appStatus.specelistsDisabled)
      return (
        <button
          onClick={() => this.clickAmend(item)}
          className="btn btn-secondary btn-md"
        >
          Redaguoti
        </button>
      );
    if (item.id === this.state.showInput && column.label !== "Vietų skaičius") {
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
