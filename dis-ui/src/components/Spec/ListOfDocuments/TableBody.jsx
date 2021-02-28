import React, { Component } from 'react';
import _ from 'lodash';
import { faFileDownload, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DocumentModal from './DocumentModal';
import ReactTooltip from 'react-tooltip';

class TableBody extends Component {
  state = {
    isClicked: false,
  };

  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item.id + (column.path || column.key);
  };

  handleClick = (e, id) => {
    e.preventDefault();
    this.setState({
      isClicked: id,
    });
  };

  render() {
    const { data } = this.props;

    return (
      <tbody className="text-secondary text-center">
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.uploadDate}</td>
            <td>{item.userName}</td>
            <td>
              <button
                data-tip
                data-for="registerTip"
                className="btn btn-info mx-2"
                onClick={(e) => this.handleClick(e, item.id)}
              >
                <FontAwesomeIcon icon={faEye} />

                {this.state.isClicked === item.id ? (
                  <DocumentModal id={item.id} showModal={true} />
                ) : null}
              </button>
              <ReactTooltip id="registerTip" place="bottom" effect="solid">
                Peržiūrėti
              </ReactTooltip>
              <button
                data-tip
                data-for="registerTip1"
                className="btn btn-success mx-2"
              >
                <a className="text-light" href={item.url}>
                  <FontAwesomeIcon icon={faFileDownload} />
                </a>
              </button>
              <ReactTooltip id="registerTip1" place="bottom" effect="solid">
                Parsisiųsti
              </ReactTooltip>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
}
export default TableBody;
