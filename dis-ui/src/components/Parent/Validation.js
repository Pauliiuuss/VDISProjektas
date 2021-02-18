import React from "react";

export const required = (value) => {
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

export const noNumbers = (value) => {
  if (/\d/.test(value)) {
    return (
      <div
        className="alert alert-danger text-center px-0 py-2"
        role="alert"
        style={{ fontSize: "9px" }}
      >
        Skaičiai negalimi
      </div>
    );
  }
};

export const validPersonalCode = (value) => {
  var stringValue = value.toString();
  if (stringValue.length !== 11) {
    return (
      <div
        className="alert alert-danger text-center px-0 py-2"
        role="alert"
        style={{ fontSize: "9px" }}
      >
        Neteisingas asmens kodo ilgis!
      </div>
    );
  }
};

export const validPhoneNumber = (value) => {
  var stringValue = value.toString();
  if (stringValue.length !== 8) {
    return (
      <div
        className="alert alert-danger text-center px-0 py-2"
        role="alert"
        style={{ fontSize: "9px" }}
      >
        Neteisingas telefono numerio ilgis!
      </div>
    );
  }
};

export const validEmail = (value) => {
  var email = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
  if (!value.match(email)) {
    return (
      <div
        className="alert alert-danger text-center px-0 py-2"
        role="alert"
        style={{ fontSize: "9px" }}
      >
        Neteisingas elektroninio pašto formatas!
      </div>
    );
  }
};
