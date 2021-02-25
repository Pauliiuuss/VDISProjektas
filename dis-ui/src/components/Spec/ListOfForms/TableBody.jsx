import React, { Component } from "react";
import _ from "lodash";
import InfoModal from "../../Parent/InfoModal";
import specService from "../../../services/spec.service";
import LoadingSpan from "../../utils/LoadingSpan";

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

  // cancelForm = async (id) => {
  //   await specService.cancelForm(id).then(
  //     (response) => {
  //       console.log(response);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // };

  // enableForm = async (id) => {
  //   await specService.enableForm(id).then(
  //     (response) => {
  //       console.log(response);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // };

  renderCell = (item, column) => {
    if (column.path === "buttons") {
      return (
        <>
          <button
            style={{ marginRight: "5px" }}
            className="btn btn-sm btn-info"
            onClick={() => this.showModal(item.personId)}
          >
            Peržiurėti
          </button>
          {item.formStatus.name !== "PANAIKINTAS" ? (
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => this.props.cancelForm(item.id)}
            >
              Panaikinti
            </button>
          ) : (
            <button
              className="btn btn-sm btn-success"
              onClick={() => this.props.enableForm(item.id)}
            >
              Aktyvinti
            </button>
          )}
        </>
      );
    }
    if (column.path === "kindergarten") {
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
    const { data, columns, loading } = this.props;
    console.log(loading);
    if (loading) return <LoadingSpan />;

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
          <td colSpan="7">
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
