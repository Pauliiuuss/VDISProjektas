import React from 'react';
import { Component } from 'react';

class RenderPasswordInput extends Component {
  state = {};
  render() {
    const { inputPlaceholder, type, forItem, value, onChange } = this.props;
    return (
      <div className="form-inline mb-3">
        <div style={{ width: '500px' }} className="input-group">
          <input
            type={type}
            id={inputPlaceholder}
            name={forItem}
            className="form-control"
            placeholder={inputPlaceholder}
            value={value}
            onChange={onChange}
            // required="required"
          />
        </div>
      </div>
    );
  }
}

export default RenderPasswordInput;
