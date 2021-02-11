import React, { Component } from "react";

class RenderSelect extends Component {
  render() {
    const {
      forItem,
      inputPlaceholder,
      value,
      onChange,
      kindergartens,
    } = this.props;
    return (
      <div className="form-inline mb-4">
        <label className="col-2" htmlFor={forItem}>
          {inputPlaceholder}
        </label>
        <select
          style={{ fontSize: "13px" }}
          className="form-control col-5"
          id={forItem}
          name={forItem}
          value={value}
          onChange={onChange}
        >
          <option>Pasirinkti darželį iš sąrašo...</option>
          {kindergartens.map((kind) => (
            <option key={kind.id}>{kind.name}</option>
          ))}
        </select>
      </div>
    );
  }
}

export default RenderSelect;
