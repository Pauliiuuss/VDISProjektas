import React, { Component, useEffect, useState } from "react";
import ParentService from "../../services/parent.service";
import CheckButton from "react-validation/build/button";
import {
  faUser,
  faHome,
  faPhone,
  faEnvelope,
  faBirthdayCake,
} from "@fortawesome/free-solid-svg-icons";
import Form from "react-validation/build/form";
import RenderInput from "./RenderInput";
import RenderSelect from "./RenderSelectForModal";
import RenderCheck from "./RenderCheck";
import SpecService from "../../services/spec.service";
import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";

const required = (value) => {
  if (!value) {
    return (
      <div
        className="alert alert-danger text-center px-0 py-2"
        role="alert"
        style={{ fontSize: "9px" }}
      >
        Privalomas laukas turi būti užpildytas!
      </div>
    );
  }
};

class RenderInfoForm extends Component {
  state = {
    message: "",
    successful: false,
    currentUser: "",
    kindergartens: [],
    disabled: true,
    showId: "",
    data: {
      address: "",
      adopted: false,
      birthDate: "",
      city: "",
      formStatus: {
        id: "",
        name: "",
      },
      handicapped: false,
      id: "",
      inCity: false,
      kindergartenPriority: {
        id: "",
        kindergartenFive: "",
        kindergartenFour: "",
        kindergartenOne: "",
        kindergartenThree: "",
        kindergartenTwo: "",
      },
      name: "",
      parentData: {
        address: "",
        city: "",
        email: "",
        id: "",
        name: "",
        personId: "",
        phoneNum: "",
        surename: "",
      },
      parentStudent: false,
      personId: "",
      postDate: "",
      surename: "",
      threeOrMore: true,
    },
  };

  componentDidMount() {
    const { showId } = this.props;
    // console.log(disabled, showId, data);
    const currentUser = AuthService.getCurrentUser();
    const userData = UserService.getUserData(currentUser.id);
    SpecService.getKindergartens()
      .then((result) => {
        this.setState({ kindergartens: result.data, userData });
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
    if (!currentUser) this.setState({ redirect: "/dis-app/" });
    this.setState({
      currentUser: currentUser,
      userReady: true,
      roles: currentUser.roles,
    });
    if (showId !== "")
      ParentService.getAllData(showId).then(
        (response) => {
          console.log(response.data);
          const data = response.data;
          this.setState({ data });
          console.log(this.state);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  unlockForm = (e) => {
    e.preventDefault();
    const action = !this.state.disabled;
    this.setState({ disabled: action });
  };

  deleteForm = (e) => {
    e.preventDefault();
    console.log("Delete form");
  };

  confirmForm = (e) => {
    e.preventDefault();
    console.log("Confirm form");
    ParentService.updateForm(this.state.data.id, {
      ...this.state.data,
      idFront: this.state.currentUser.id,
    }).then(
      (response) => {
        console.log(response.data.message);
        this.setState({
          successful: true,
          message: response.data.message,
        });
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          successful: false,
          message: resMessage,
        });
      }
    );
    const action = !this.state.disabled;
    this.setState({ disabled: action });
  };

  kindergartenDropdownSelect = (e) => {
    e.preventDefault();
    this.setState({
      data: {
        ...this.state.data,
        kindergartenPriority: {
          ...this.state.data.kindergartenPriority,
          [e.target.name]: e.target.value,
        },
      },
    });
    console.log(this.state.data.kindergartenPriority);
  };

  handleSelectChange = (e) => {
    const value = this.state[e.target.name];
    console.log(value);
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: !value,
      },
    });
  };

  handleChangeForChild = (e) => {
    const { name, value } = e.target;
    this.setState({
      data: {
        ...this.state.data,
        [name]: value,
      },
    });
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      data: {
        ...this.state.data,
        parentData: {
          ...this.state.data.parentData,
          [name]: value,
        },
      },
    });
  };

  render() {
    console.log(this.state.data);

    const { disabled } = this.state;
    return (
      <Form
        className="container text-secondary"
        onSubmit={this.handleSubmit}
        ref={(c) => {
          this.form = c;
        }}
      >
        <div>
          <h3 className="mb-4 text-center">Vaiko atstovas 1</h3>
          <RenderInput
            type={"text"}
            forItem={"name"}
            inputPlaceholder={"Vardas"}
            value={this.state.data.parentData.name}
            onChange={this.handleChange}
            icon={faUser}
            valid={[required]}
            mandatory={true}
            disabled={disabled}
          />
          <RenderInput
            type={"text"}
            forItem={"surename"}
            inputPlaceholder={"Pavardė"}
            value={this.state.data.parentData.surename}
            onChange={this.handleChange}
            icon={faUser}
            valid={[required]}
            mandatory={true}
            disabled={disabled}
          />
          <RenderInput
            type={"number"}
            forItem={"personId"}
            inputPlaceholder={"Asmens kodas"}
            value={this.state.data.parentData.personId}
            onChange={this.handleChange}
            icon={faUser}
            valid={[required]}
            mandatory={true}
            disabled={disabled}
          />
          <RenderInput
            type={"text"}
            forItem={"address"}
            inputPlaceholder={"Adresas"}
            value={this.state.data.parentData.address}
            onChange={this.handleChange}
            icon={faHome}
            valid={[required]}
            mandatory={true}
            disabled={disabled}
          />
          <RenderInput
            type={"text"}
            forItem={"city"}
            inputPlaceholder={"Miestas"}
            value={this.state.data.parentData.city}
            onChange={this.handleChange}
            icon={faHome}
            valid={[required]}
            mandatory={true}
            disabled={disabled}
          />
          <RenderInput
            type={"number"}
            forItem={"phoneNum"}
            inputPlaceholder={"Telefonas"}
            value={this.state.data.parentData.phoneNum}
            onChange={this.handleChange}
            icon={faPhone}
            valid={[required]}
            mandatory={true}
            disabled={disabled}
          />
          <RenderInput
            type={"email"}
            forItem={"email"}
            inputPlaceholder={"El.paštas"}
            value={this.state.data.parentData.email}
            onChange={this.handleChange}
            icon={faEnvelope}
            valid={[required]}
            mandatory={true}
            disabled={disabled}
          />
        </div>
        {/* <div>
          <h3 className="mb-4 text-center">Vaiko atstovas 2</h3>
          <RenderInput
            type={"text"}
            forItem={"vardasAtstovas2"}
            inputPlaceholder={"Vardas"}
            value={this.state.vardasAtstovas2}
            onChange={this.handleChange}
            icon={faUser}
            disabled={disabled}
          />
          <RenderInput
            type={"text"}
            forItem={"pavardeAtstovas2"}
            inputPlaceholder={"Pavardė"}
            value={this.state.pavardeAtstovas2}
            onChange={this.handleChange}
            icon={faUser}
            disabled={disabled}
          />
          <RenderInput
            type={"number"}
            forItem={"kodasAtstovas2"}
            inputPlaceholder={"Asmens kodas"}
            value={this.state.kodasAtstovas2}
            onChange={this.handleChange}
            icon={faUser}
            disabled={disabled}
          />
          <RenderInput
            type={"text"}
            forItem={"adresasAtstovas2"}
            inputPlaceholder={"Adresas"}
            value={this.state.adresasAtstovas2}
            onChange={this.handleChange}
            icon={faHome}
            disabled={disabled}
          />
          <RenderInput
            type={"text"}
            forItem={"miestasAtstovas2"}
            inputPlaceholder={"Miestas"}
            value={this.state.miestasAtstovas2}
            onChange={this.handleChange}
            icon={faHome}
            disabled={disabled}
          />
          <RenderInput
            type={"number"}
            forItem={"telAtstovas2"}
            inputPlaceholder={"Telefonas"}
            value={this.state.telAtstovas2}
            onChange={this.handleChange}
            icon={faPhone}
            disabled={disabled}
          />
          <RenderInput
            type={"email"}
            forItem={"elpastasAtstovas2"}
            inputPlaceholder={"El.paštas"}
            value={this.state.elpastasAtstovas2}
            onChange={this.handleChange}
            icon={faEnvelope}
            disabled={disabled}
          />
        </div> */}
        <div>
          <h3 className="mt-5 mb-4 text-center">Vaiko informacija</h3>
          <RenderInput
            type={"text"}
            forItem={"name"}
            inputPlaceholder={"Vardas"}
            value={this.state.data.name}
            onChange={this.handleChangeForChild}
            icon={faUser}
            valid={[required]}
            mandatory={true}
            disabled={disabled}
          />
          <RenderInput
            type={"text"}
            forItem={"surename"}
            inputPlaceholder={"Pavardė"}
            value={this.state.data.surename}
            onChange={this.handleChangeForChild}
            icon={faUser}
            valid={[required]}
            mandatory={true}
            disabled={disabled}
          />
          <RenderInput
            type={"number"}
            forItem={"personId"}
            inputPlaceholder={"Asmens kodas"}
            value={this.state.data.personId}
            onChange={this.handleChangeForChild}
            icon={faUser}
            valid={[required]}
            mandatory={true}
            disabled={disabled}
          />
          <RenderInput
            type={"date"}
            forItem={"birthDate"}
            inputPlaceholder={"Gimimo data"}
            value={this.state.data.birthDate.substr(0, 10)}
            onChange={this.handleChangeForChild}
            icon={faBirthdayCake}
            valid={[required]}
            mandatory={true}
            disabled={disabled}
          />

          <RenderInput
            type={"text"}
            forItem={"address"}
            inputPlaceholder={"Adresas"}
            value={this.state.data.address}
            onChange={this.handleChangeForChild}
            icon={faHome}
            valid={[required]}
            mandatory={true}
            disabled={disabled}
          />
          <RenderInput
            type={"text"}
            forItem={"city"}
            inputPlaceholder={"Miestas"}
            value={this.state.data.city}
            onChange={this.handleChangeForChild}
            icon={faHome}
            valid={[required]}
            mandatory={true}
            disabled={disabled}
          />
        </div>
        <div>
          <h3 className="mb-4 mt-5 text-center">
            Pasirinkite darželį (prioriteto mažėjimo tvarka):
            <span className="text-danger" style={{ fontSize: 25 }}>
              *
            </span>
          </h3>
          <div className="form-group">
            <RenderSelect
              forItem={"kindergartenOne"}
              inputPlaceholder={"1 prioritetas"}
              value={this.state.data.kindergartenPriority.kindergartenOne}
              onChange={this.kindergartenDropdownSelect}
              kindergartens={this.state.kindergartens}
              disabled={disabled}
            />
            <RenderSelect
              forItem={"kindergartenTwo"}
              inputPlaceholder={"2 prioritetas"}
              value={this.state.kindergartens.kindergartenTwo}
              onChange={this.kindergartenDropdownSelect}
              kindergartens={this.state.kindergartens}
              disabled={disabled}
            />
            <RenderSelect
              forItem={"kindergartenThree"}
              inputPlaceholder={"3 prioritetas"}
              value={this.state.kindergartens.kindergartenThree}
              onChange={this.kindergartenDropdownSelect}
              kindergartens={this.state.kindergartens}
              disabled={disabled}
            />

            <RenderSelect
              forItem={"kindergartenFour"}
              inputPlaceholder={"4 prioritetas"}
              value={this.state.kindergartens.kindergartenFour}
              onChange={this.kindergartenDropdownSelect}
              kindergartens={this.state.kindergartens}
              disabled={disabled}
            />

            <RenderSelect
              forItem={"kindergartenFive"}
              inputPlaceholder={"5 prioritetas"}
              value={this.state.kindergartens.kindergartenFive}
              onChange={this.kindergartenDropdownSelect}
              kindergartens={this.state.kindergartens}
              disabled={disabled}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <h3 className="mb-4 mt-5 text-center">
              Pažymėkite visas atitinkančias sąlygas:
            </h3>
            <RenderCheck
              onChange={this.handleSelectChange}
              forItem={"inCity"}
              checked={this.state.data.inCity}
              label={"Deklaruota gyvenomoji vieta Vilniaus m."}
              disabled={disabled}
            />
            <RenderCheck
              onChange={this.handleSelectChange}
              forItem={"adopted"}
              checked={this.state.data.adopted}
              label={"Vaikas įvaikintas."}
              disabled={disabled}
            />
            <RenderCheck
              onChange={this.handleSelectChange}
              forItem={"threeOrMore"}
              checked={this.state.data.threeOrMore}
              label={
                "Šeimoje yra 3 ir daugiau vaikų, besimokančių bendro ugdymo programose."
              }
              disabled={disabled}
            />
            <RenderCheck
              onChange={this.handleSelectChange}
              forItem={"parentStudent"}
              checked={this.state.data.parentStudent}
              label={"Vienas iš tėvų(globėjų) mokosi bendro ugdymo mokykloje."}
              disabled={disabled}
            />
            <RenderCheck
              onChange={this.handleSelectChange}
              forItem={"handicapped"}
              checked={this.state.data.handicapped}
              label={
                "Vienas iš tėvų(globėjų) turi ne daugiau kaip 40 proc nedarbingumo lygio"
              }
              disabled={disabled}
            />
          </div>
        </div>
        {disabled ? (
          <div>
            <button
              className="btn btn-info my-5"
              onClick={(e) => this.unlockForm(e)}
            >
              Redaguoti prašymą
            </button>
            <button
              className="btn btn-danger my-5 m-1"
              onClick={(e) => this.deleteForm(e)}
            >
              Ištrinti
            </button>
          </div>
        ) : (
          <div>
            <button
              className="btn btn-success my-5"
              onClick={(e) => this.confirmForm(e)}
            >
              Patvirtinti
            </button>
            <button
              className="btn btn-secondary my-5 m-1"
              onClick={(e) => this.unlockForm(e)}
            >
              Atšaukti{" "}
            </button>
          </div>
        )}
        {this.state.message && (
          <div className="form-group">
            <div
              className={
                this.state.successful
                  ? "alert alert-success"
                  : "alert alert-danger"
              }
              role="alert"
            >
              {this.state.message}
            </div>
          </div>
        )}
        <CheckButton
          style={{ display: "none" }}
          ref={(c) => {
            this.checkBtn = c;
          }}
        />
      </Form>
    );
  }
}

export default RenderInfoForm;
