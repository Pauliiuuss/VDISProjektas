import React, { useEffect, useState } from "react";
import Navbar from "../navbar.component";
import SpecService from "../../services/spec.service";
import Forms from "./ListOfForms/Forms";
import KindergartenModal from "./ListOfForms/KindergartenModal";
import specService from "../../services/spec.service";
import AuthService from "../../services/auth.service";
import { Redirect } from "react-router-dom";

const ChildFormsQueue = () => {
  const [forms, setForms] = useState([]);
  const [current, setCurrent] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [kindergarten, setKindergarten] = useState("");
  const [fromsLoading, setFromsLoading] = useState(true);
  const [redirctTo, setRedirctTo] = useState(false);

  useEffect(() => {
    SpecService.getForms(current).then((response) => {
      setForms(response.data);
      setFromsLoading(false);
      console.log(response);
    });
  }, [current]);

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) {
      setRedirctTo(true);
    }
    if (!currentUser.roles.includes("ROLE_SPEC")) {
      setRedirctTo(true);
    }
  }, []);

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
  }

  async function enableForm(id) {
    setFromsLoading(true);
    await specService.enableForm(id).then(
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
  }

  console.log(fromsLoading);
  if (redirctTo) {
    return <Redirect to="/dis-app" />;
  } else {
    return (
      <React.Fragment>
        <Navbar />
        <div className="container">
          <h3 style={{ paddingLeft: "3%", paddingTop: "3%" }}>
            Darželių eilės
          </h3>
          <div>
            <Forms
              cancelForm={cancelForm}
              enableForm={enableForm}
              loading={fromsLoading}
              handleConfirm={handleConfirm}
              forms={forms}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
};

export default ChildFormsQueue;
