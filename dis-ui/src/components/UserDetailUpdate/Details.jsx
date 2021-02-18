import React, { useState } from 'react';
import RenderInput from './util/RenderInput';
import { faUser, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Details = ({ userData, onSubmit, message, successful }) => {
  const [name, setName] = useState(userData.name);
  const [surname, setSurname] = useState(userData.surename);
  const [phone, setPhone] = useState(userData.phoneNum);
  const [email, setEmail] = useState(userData.email);

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2 className={'m-3 text-secondary'}>Mano duomenys</h2>
      <form onSubmit={(e) => onSubmit(e, name, surname, phone, email)}>
        <div className="form-group">
          <RenderInput
            inputPlaceholder={'Vardas'}
            type={'text'}
            forItem={name}
            value={name}
            onChange={(e) => setName(e.target.value)}
            icon={faUser}
          />
          <RenderInput
            inputPlaceholder={'Pavardė'}
            type={'text'}
            forItem={surname}
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            icon={faUser}
          />
          <RenderInput
            inputPlaceholder={'Tel'}
            type={'number'}
            forItem={phone}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            icon={faPhone}
            disNumInputSymbols={(evt) =>
              (evt.key === 'e' && evt.preventDefault()) ||
              (evt.key === 'E' && evt.preventDefault()) ||
              (evt.key === ',' && evt.preventDefault()) ||
              (evt.key === '=' && evt.preventDefault()) ||
              (evt.key === '-' && evt.preventDefault()) ||
              (evt.key === '.' && evt.preventDefault())
            }
            span={
              <span
                className="input-group-text"
                style={{
                  fontSize: '12px',
                  fontWeight: 'bold',
                  padding: 4,
                }}
              >
                +370
              </span>
            }
          />
          <RenderInput
            inputPlaceholder={'El.paštas'}
            type={'text'}
            forItem={email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={faEnvelope}
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
            Atnaujinti
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

export default Details;
