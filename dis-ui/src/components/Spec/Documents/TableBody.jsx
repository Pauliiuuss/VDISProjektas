import React, { Component } from 'react';
import _ from 'lodash';
import { faFileDownload, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DocumentModal from './DocumentModal';

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
                className="btn btn-info mx-3"
                onClick={(e) => this.handleClick(e, item.id)}
              >
                <FontAwesomeIcon icon={faEye} />
                {this.state.isClicked === item.id ? (
                  <DocumentModal id={item.id} />
                ) : null}
              </button>
              <button className="btn btn-success mx-3">
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
