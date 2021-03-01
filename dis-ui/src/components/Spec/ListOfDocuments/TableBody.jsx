import React, { Component } from 'react';
import _ from 'lodash';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactTooltip from 'react-tooltip';
import UploadService from '../../../services/upload-files.service';

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item.id + (column.path || column.key);
  };

  handleDownload = async (e, item) => {
    e.preventDefault();
    await UploadService.downloadFile(item);
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
                data-for="registerTip1"
                className="btn btn-success mx-2"
                onClick={(e) => this.handleDownload(e, item)}
              >
                <FontAwesomeIcon icon={faFileDownload} />
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
