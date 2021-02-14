import React, { useEffect, useState } from 'react';
import RenderPasswordInput from './util/RenderPasswordInput';

const Password = ({ currentUser, onPasswordSubmit, message, successful }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword1, setNewPassword1] = useState('');
  const [newPassword2, setNewPassword2] = useState('');

  useEffect(() => {
    if (successful) {
      setOldPassword('');
      setNewPassword1('');
      setNewPassword2('');
    }
  }, [successful]);

  return (
    <div style={{ marginTop: '50px' }}>
      <div style={{ textAlign: 'center' }}>
        <h2 className={'m-3 text-secondary'}>Pakeisti slaptažodį</h2>
        <h6 className={'m-3 text-secondary'}>
          Prisijungimo vardas:{'  '}
          <i>
            <b>{currentUser.username}</b>
          </i>
        </h6>
      </div>
      <p className="text-secondary mb-0 font-weight-bold">
        Reikalavimai keičiamam slaptažodžiui:
      </p>
      <p className="text-secondary text-justify font-italic">
        Slaptažodis turi būti ne mažiau 8 simbolių ilgo turi būti bent viena
        didžioji ir bent viena mažoji raidė, ir bent vieas skaičius.
      </p>
      <form
        onSubmit={(e) =>
          onPasswordSubmit(
            e,
            currentUser,
            oldPassword,
            newPassword1,
            newPassword2
          )
        }
      >
        <div className="form-group">
          <RenderPasswordInput
            inputPlaceholder={'Dabartinis slaptažodis'}
            type={'password'}
            forItem={oldPassword}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <RenderPasswordInput
            inputPlaceholder={'Naujas slaptažodis'}
            type={'password'}
            forItem={newPassword1}
            value={newPassword1}
            onChange={(e) => setNewPassword1(e.target.value)}
          />
          <RenderPasswordInput
            inputPlaceholder={'Pakartokite naują slaptažodį'}
            type={'password'}
            forItem={newPassword2}
            value={newPassword2}
            onChange={(e) => setNewPassword2(e.target.value)}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <button type="submit" className="btn btn-success mx-auto">
            Pakeisti slaptažodį
          </button>
        </div>
        {message && (
          <div className="form-group m-3">
            <div
              className={
                successful ? 'alert alert-success' : 'alert alert-danger'
              }
              role="alert"
            >
              {message}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Password;
