import React, { Component } from 'react';
import _ from 'lodash';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class TableBody extends Component {
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
      <tbody className="text-secondary text-center">
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.uploadDate}</td>
            <td>{item.userName}</td>
            <td>
              <button className="btn btn-info">
                <a className="text-light" href={item.url}>
                  <FontAwesomeIcon icon={faFileDownload} />
                </a>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
