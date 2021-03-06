import React, { useEffect, useState } from "react";
import Navbar from "../navbar.component";
import SpecService from "../../services/spec.service";
import Forms from "./ListOfForms/Forms";
import specService from "../../services/spec.service";
import AuthService from "../../services/auth.service";
import { Redirect } from "react-router-dom";
import swal from "sweetalert";

const ChildFormsQueue = () => {
  const [forms, setForms] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [current, setCurrent] = useState(0);
  // const [showModal, setShowModal] = useState(false);
  // const [kindergarten, setKindergarten] = useState("");
  const [fromsLoading, setFromsLoading] = useState(true);
  const [redirctTo, setRedirctTo] = useState(false);

  useEffect(() => {
    SpecService.getForms(current).then((response) => {
      setForms(response.data);
      setFromsLoading(false);
    });
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) {
      setRedirctTo(true);
    }
    if (!currentUser.roles.includes("ROLE_SPEC")) {
      setRedirctTo(true);
    }
  }, [current]);

  function handleConfirm() {
    setFromsLoading(true);

    swal({
      title: "Ar jūs tikrai to norite?",
      text:
        "Vaikų registracijų formų statusai bus pakeisti į PRIIMTAS arba EILĖJE negrįžtamai! Tai gali užtrukti.",
      icon: "info",
      buttons: ["Atšaukti", "Sudaryti"],
    }).then((willDelete) => {
      if (willDelete) {
        SpecService.confirmQueue().then(
          (response) => {
            SpecService.getForms(current).then((response) => {
              setForms(response.data);
              setFromsLoading(false);
            });
            window.location.reload();
          },
          (error) => {
            console.log(error);
            setFromsLoading(false);
          }
        );
      } else {
        SpecService.getForms(current).then((response) => {
          setForms(response.data);
          setFromsLoading(false);
        });
      }
    });
  }

  async function cancelForm(id) {
    setFromsLoading(true);
    await specService.cancelForm(id).then(
      (response) => {
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

  if (redirctTo) {
    return <Redirect to="/dis-app" />;
  } else {
    return (
      <React.Fragment>
        <Navbar />
        <div className="container ">
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
