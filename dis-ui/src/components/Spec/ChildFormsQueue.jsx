import React, { useEffect, useState } from "react";
import Navbar from "../navbar.component";
import SpecService from "../../services/spec.service";
import Forms from "./ListOfForms/Forms";
import KindergartenModal from "./ListOfForms/KindergartenModal";
import specService from "../../services/spec.service";

const ChildFormsQueue = () => {
  const [forms, setForms] = useState([]);
  const [current, setCurrent] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [kindergarten, setKindergarten] = useState("");
  const [fromsLoading, setFromsLoading] = useState(true);

  useEffect(() => {
    SpecService.getForms(current).then((response) => {
      setForms(response.data);
      setFromsLoading(false);
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

  function handleConfirm() {
    setFromsLoading(true);
    console.log(fromsLoading);
    if (
      window.confirm(
        "Vaikų registracijų formų statusai bus pakeisti į PRIIMTAS arba EILĖJE negryštamai! Tai gali užtrukti."
      )
    ) {
      console.log("Confirmed");
      SpecService.confirmQueue().then(
        (response) => {
          console.log(response);
          SpecService.getForms(current).then((response) => {
            setForms(response.data);
            setFromsLoading(false);
          });
        },
        (error) => {
          console.log(error);
          setFromsLoading(false);
        }
      );
    } else console.log("Canceled");
  }

  async function cancelForm(id) {
    setFromsLoading(true);
    await specService.cancelForm(id).then(
      (response) => {
        console.log(response);
        setFromsLoading(false);
      },
      (error) => {
        console.log(error);
        setFromsLoading(false);
      }
    );
  }

  async function enableForm(id) {
    setFromsLoading(true);
    await specService.enableForm(id).then(
      (response) => {
        console.log(response);
        setFromsLoading(false);
      },
      (error) => {
        console.log(error);
        setFromsLoading(false);
      }
    );
  }

  console.log(fromsLoading);
  return (
    <React.Fragment>
      <Navbar />
      <div className="container">
        <h3 style={{ paddingLeft: "3%", paddingTop: "3%" }}>Darželių eilės</h3>
        <div>
          <KindergartenModal
            kindergarten={kindergarten}
            show={showModal}
            handleClose={hideModal}
          />
          <Forms
            cancelForm={cancelForm}
            enableForm={enableForm}
            loading={fromsLoading}
            handleConfirm={handleConfirm}
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
