import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Component } from 'react';

class RenderInput extends Component {
  state = {};
  render() {
    const {
      inputPlaceholder,
      type,
      forItem,
      value,
      onChange,
      icon,
      // phoneLength,
    } = this.props;
    return (
      <div className="form-inline mb-3">
        <div style={{ width: '500px' }} className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <FontAwesomeIcon icon={icon} />
            </span>
          </div>
          <input
            type={type}
            id={inputPlaceholder}
            name={forItem}
            className="form-control"
            placeholder={inputPlaceholder}
            value={value ? value : ''}
            onChange={onChange}
            // max={phoneLength}
          />
        </div>
      </div>
    );
  }
}

export default RenderInput;
