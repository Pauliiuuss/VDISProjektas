import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Component } from "react";

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
      span,
      icon,
      disNumInputSymbols,
    } = this.props;
    return (
      <div className="form-inline mb-3">
        <div style={{ width: "500px" }} className="input-group">
          <div className="input-group-prepend">
            {span ? (
              span
            ) : (
              <span className="input-group-text px-auto">
                <FontAwesomeIcon icon={icon} />
              </span>
            )}
          </div>
          <input
            type={type}
            id={inputPlaceholder}
            name={forItem}
            className="form-control"
            placeholder={inputPlaceholder}
            value={value ? value : ""}
            onChange={onChange}
            validations={valid}
            onKeyDown={disNumInputSymbols}
          />
        </div>
      </div>
    );
  }
}

export default RenderInput;
