import React, { Component } from "react";

class RenderCheck extends Component {
  state = {};
  render() {
    const { onChange, forItem, checked, label } = this.props;
    return (
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id={forItem}
          name={forItem}
          checked={checked}
          onChange={onChange}
        />
        <label className="form-check-label" htmlFor="defaultCheck1">
          {label}
        </label>
      </div>
    );
  }
}

export default RenderCheck;
