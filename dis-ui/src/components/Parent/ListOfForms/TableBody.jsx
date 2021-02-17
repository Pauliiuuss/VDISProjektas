import React, { Component } from "react";
import _ from "lodash";
import InfoModal from "../InfoModal";
import Modal from "react-bootstrap/Modal";

class TableBody extends Component {
  state = {
    show: false,
    showId: "",
  };

  showModal = (showId) => {
    this.setState({ showId, show: true });
  };

  hideModal = () => {
    this.setState({ show: false, showId: "" });
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

    return (
      <React.Fragment>
        <InfoModal
          showId={this.state.showId}
          show={this.state.show}
          handleClose={this.hideModal}
        />
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {columns.map((column) => (
                <td key={this.createKey(item, column)}>
                  {this.renderCell(item, column)}
                </td>
              ))}
              <td style={{ width: "100px" }}>
                <button
                  className="btn btn-md btn-info"
                  onClick={() => this.showModal(item.personId)}
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  Informacija
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </React.Fragment>
    );
  }
}

export default TableBody;
