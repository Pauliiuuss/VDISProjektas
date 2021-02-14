import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Component } from 'react';
import Input from 'react-validation/build/input';

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
      valid,
      mandatory,
    } = this.props;

    return (
      <div className="form-inline mb-3">
        <label className="my-auto col-4" htmlFor={forItem}>
          {inputPlaceholder} :{' '}
          {mandatory ? (
            <span className="text-danger" style={{ fontSize: 20 }}>
              *
            </span>
          ) : (
            ''
          )}
        </label>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <FontAwesomeIcon icon={icon} />
            </span>
          </div>
          <Input
            type={type}
            id={forItem}
            name={forItem}
            className="form-control"
            placeholder={inputPlaceholder}
            value={value}
            onChange={onChange}
            validations={valid}
          />
        </div>
      </div>
    );
  }
}

export default RenderInput;
