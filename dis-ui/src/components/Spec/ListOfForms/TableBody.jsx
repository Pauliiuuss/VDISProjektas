import React, { Component } from "react";
import _ from "lodash";
import InfoModal from "../../Parent/InfoModal";

class TableBody extends Component {
  state = {
    showInput: "",
    name: "",
    address: "",
    showId: "",
    show: "",
    hideModal: true,
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
    if (column.path === "buttons") {
      return (
        <>
          <button
            style={{ marginRight: "5px" }}
            className="btn btn-sm btn-info"
            onClick={() => this.showModal(item.personId)}
          >
            Informacija
          </button>
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => console.log("Delete has not been implemented yet")}
          >
            Ištrinti
          </button>
        </>
      );
    }
    if (column.path === "birthDate") {
      return Math.round(
        (new Date() - new Date(item.birthDate)) / (1000 * 60 * 60 * 24 * 365)
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

  showModal = (showId) => {
    this.setState({ showId, show: true });
  };

  hideModal = () => {
    this.setState({ show: false, showId: "" });
    window.location.reload();
  };

  render() {
    const { data, columns } = this.props;

    if (data.length > 0)
      return (
        <React.Fragment>
          <InfoModal
            showId={this.state.showId}
            show={this.state.show}
            handleClose={this.hideModal}
            spec={true}
          />
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
        </React.Fragment>
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
