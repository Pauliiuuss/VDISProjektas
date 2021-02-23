import React, { useEffect, useState } from "react";
import SpecService from "../../../services/spec.service";

const DropdownOfKindergartens = ({ handleChange }) => {
  const [kindergartens, setKindergartens] = useState([]);
  const [current, setCurrent] = useState("Pasirinkti darželį iš sąrašo...");

  useEffect(() => {
    SpecService.getKindergartens().then((response) => {
      setKindergartens(response.data);
      console.log(response.data);
    });
  }, []);

  function onChange(e) {
    setCurrent(e.target.value);
    handleChange(e.target.value);
  }

  return (
    <React.Fragment>
      <div className="form-group">
        {/* <label
          style={{ fontSize: "0.8rem" }}
          className="col-6 col-sm-12 col-md-6 col-lg-6"
        >
          Pasirinkti darželį...
        </label> */}
        <select
          style={{ fontSize: "13px" }}
          className="form-control"
          value={current}
          onChange={onChange}
        >
          <option value="0">Pasirinkti darželį iš sąrašo...</option>
          {kindergartens.map((kind) => (
            <option value={kind.id} key={kind.id}>
              {kind.name}
            </option>
          ))}
        </select>
      </div>
    </React.Fragment>
  );
};

export default DropdownOfKindergartens;
