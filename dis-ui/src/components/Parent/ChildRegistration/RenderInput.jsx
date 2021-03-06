import React from "react";
import { Component } from "react";
import Input from "react-validation/build/input";

class RenderInput extends Component {
  state = {};

  render() {
    const {
      inputPlaceholder,
      type,
      forItem,
      value,
      onChange,
      valid,
      mandatory,
      disabled,
      span,
      disNumInputSymbols,
      style,
    } = this.props;

    return (
      <div className="form-inline mb-3">
        <label
          className="my-auto col-4"
          htmlFor={forItem}
          style={{ padding: "0 10px" }}
        >
          {inputPlaceholder} :{" "}
          {mandatory ? (
            <span className="text-danger" style={{ fontSize: 20 }}>
              *
            </span>
          ) : (
            ""
          )}
        </label>
        <div className="input-group">
          {span && <div className="input-group-prepend">{span}</div>}
          <Input
            type={type}
            id={forItem}
            name={forItem}
            className="form-control"
            placeholder={inputPlaceholder}
            value={value}
            onChange={onChange}
            validations={valid}
            disabled={disabled}
            onKeyDown={disNumInputSymbols}
            style={style}
          />
        </div>
      </div>
    );
  }
}

export default RenderInput;
