import React, { useEffect, useState } from "react";
import Navbar from "../navbar.component";
import SpecService from "../../services/spec.service";
import Forms from "./ListOfForms/Forms";

const ChildFormsQueue = () => {
  const [forms, setForms] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    SpecService.getForms(current).then((response) => {
      setForms(response.data);
    });
  }, [current]);

  function handleChange(value) {
    console.log(current);
    setCurrent(value);
  }

  console.log(forms);
  return (
    <React.Fragment>
      <Navbar />
      <div className="container">
        <div>
          <Forms forms={forms} handleChange={handleChange} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ChildFormsQueue;
