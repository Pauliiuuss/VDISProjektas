import React, { useEffect, useState } from "react";
import Navbar from "../navbar.component";
import SpecService from "../../services/spec.service";
import Forms from "./ListOfForms/Forms";
import KindergartenModal from "./ListOfForms/KindergartenModal";

const ChildFormsQueue = () => {
  const [forms, setForms] = useState([]);
  const [current, setCurrent] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [kindergarten, setKindergarten] = useState("");

  useEffect(() => {
    SpecService.getForms(current).then((response) => {
      setForms(response.data);
    });
  }, [current]);

  function handleChange(value) {
    console.log(current);
    setCurrent(value);
  }

  async function handleQueueBuild() {
    setShowModal(true);
    console.log("jep");
    console.log(current);
    await SpecService.getKindergarten(current).then(
      (response) => {
        setKindergarten(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  function hideModal() {
    setShowModal(false);
  }

  console.log(kindergarten);
  return (
    <React.Fragment>
      <Navbar />
      <div className="container">
        <div>
          <KindergartenModal
            kindergarten={kindergarten}
            show={showModal}
            handleClose={hideModal}
          />
          <Forms
            handleQueueBuild={handleQueueBuild}
            forms={forms}
            handleChange={handleChange}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ChildFormsQueue;
