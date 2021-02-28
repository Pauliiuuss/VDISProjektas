import React, { Component } from 'react';
import _ from 'lodash';
import InfoModal from '../ListOfForms/InfoModal';
import FileUpload from '../FileUpload';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip';

class TableBody extends Component {
  state = {
    show: false,
    showId: '',
  };

  showModal = (showId) => {
    this.setState({ showId, show: true });
  };

  hideModal = () => {
    this.setState({ show: false, showId: '' });
    window.location.reload();
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
              <td className="text-center">
                <button
                  data-tip
                  data-for="registerTip2"
                  className="btn btn-info "
                  onClick={() => this.showModal(item.personId)}
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>
                <ReactTooltip id="registerTip2" place="bottom" effect="solid">
                  Peržiūrėti
                </ReactTooltip>
              </td>
              <td className="text-center">
                <FileUpload />
              </td>
            </tr>
          ))}
        </tbody>
      </React.Fragment>
    );
  }
}

export default TableBody;
