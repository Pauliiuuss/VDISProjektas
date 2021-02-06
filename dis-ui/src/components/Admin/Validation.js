import React from 'react';

export const vusername = (value) => {
  var nospace = /^\S*$/;
  if (value.length === 0) return;

  if (value.length < 4 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Prisijungimo vardas turi būti sudarytas iš ne mažiau kaip 4 simbolių.{' '}
      </div>
    );
  } else if (!value.match(nospace)) {
    return (
      <div className="alert alert-danger" role="alert">
        Įsitikinkite, kad įvesdami prisijungimo vardą nepalikote tarpų.{' '}
      </div>
    );
  }
};

export const vpassword = (value) => {
  var paswd = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[a-zA-Z0-9].{7,19}$/;
  if (value.length === 0) return;

  if (value.length < 8 || value.length > 20 || value.match(paswd) === null) {
    return (
      <div className="alert alert-danger" role="alert">
        Slaptažodyje, kurį turi sudaryti iš 8–20 simbolių, turi būti bent viena
        didžioji raidė, viena mažoji raidė ir vienas skaičius.
      </div>
    );
  }
};
