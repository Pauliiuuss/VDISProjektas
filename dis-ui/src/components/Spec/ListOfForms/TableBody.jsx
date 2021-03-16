import React, { Component } from "react";
import _ from "lodash";
import InfoModal from "../../Parent/ListOfForms/InfoModal";
import LoadingSpan from "../../utils/LoadingSpan";
import ParentService from "../../../services/parent.service";

class TableBody extends Component {
  state = {
    showInput: "",
    name: "",
    address: "",
    showId: "",
    show: "",
    hideModal: true,
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
      this.setState({ appStatus: response.data });
    });
  }

  renderCell = (item, column) => {
    if (column.path === "formStatus.name" && item.formStatus.name === "EILEJE")
      return "EILĖJE";
    if (column.path === "buttons") {
      return (
        <>
          <button
            style={{ marginRight: "5px" }}
            className="btn btn-sm btn-info"
            onClick={() => this.showModal(item.personId)}
          >
            Peržiūrėti
          </button>
          {item.formStatus.name !== "PANAIKINTAS" ? (
            <button
              hidden={
                item.formStatus.name === "PRIIMTAS" ||
                item.formStatus.name === "EILEJE"
              }
              className="btn btn-sm btn-secondary"
              onClick={() => this.props.cancelForm(item.id)}
            >
              Panaikinti
            </button>
          ) : (
            <button
              hidden={
                this.props.columns.filter((c) => c.path === "groupName")
                  .length > 0
              }
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
  };

  render() {
    const { data, columns, loading } = this.props;
    if (loading) return <LoadingSpan />;

    if (data.length > 0)
      return (
        <React.Fragment>
          <InfoModal
            spec={true}
            showId={this.state.showId}
            show={this.state.show}
            handleClose={this.hideModal}
          />
          <tbody>
            {data.map((item) => (
              <tr
                className={this.props.active === item.id ? "active" : ""}
                key={item.id}
              >
                {columns.map((column) => (
                  <td
                    hidden={
                      this.state.appStatus.specelistsDisabled &&
                      column.path === "buttons"
                    }
                    key={this.createKey(item, column)}
                  >
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
              Duomenų bazėje pagal paiešką vaikų formų nėra registruota.
            </p>
          </td>
        </tr>
      </tbody>
    );
  }
}

export default TableBody;
