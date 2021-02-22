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
      <div className="form-group row">
        <label className="col-5 col-sm-12 col-md-5 col-lg-5">
          Pasirinkti darželį iš sąrašo...
        </label>
        <select
          style={{ fontSize: "13px" }}
          className="form-control col-7 col-sm-12 col-md-7 col-lg-7"
          value={current}
          onChange={onChange}
        >
          <option value="0">Visi darželiai...</option>
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
