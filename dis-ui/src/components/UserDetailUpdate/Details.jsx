import React, { useEffect, useState } from 'react';
import RenderInput from './util/RenderInput';
import AuthService from '../../services/auth.service';
import { faUser, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArchive } from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from 'react-tooltip';
import {
  noNumbers,
  required,
  validEmail,
  validPhoneNumber,
} from '../Parent/Validation';

const Details = ({
  userData,
  id,
  onSubmit,
  handleDownload,
  message,
  successful,
  clearUpdateFormMessage,
}) => {
  const [name, setName] = useState(userData.name);
  const [surname, setSurname] = useState(userData.surename);
  const [phone, setPhone] = useState(userData.phoneNum);
  const [email, setEmail] = useState(userData.email);
  const [initialValue, setInitialValue] = useState(userData);

  function handleCancel() {
    clearUpdateFormMessage();
    setName(initialValue.name);
    setSurname(initialValue.surename);
    setPhone(initialValue.phoneNum);
    setEmail(initialValue.email);
  }

  function getButtonState() {
    if (
      initialValue.name === name &&
      initialValue.surename === surname &&
      initialValue.email === email &&
      +initialValue.phoneNum === +phone
    ) {
      return true;
    } else return false;
  }

  useEffect(() => {
    setInitialValue(userData);
  }, [userData]);

  const currentUser = AuthService.getCurrentUser();

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
            valid={[noNumbers, required]}
            mandatory={true}
          />
          <RenderInput
            inputPlaceholder={'Pavardė'}
            type={'text'}
            forItem={surname}
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            icon={faUser}
            valid={[noNumbers, required]}
            mandatory={true}
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
            valid={[required, validPhoneNumber]}
            mandatory={true}
          />
          <RenderInput
            inputPlaceholder={'El.paštas'}
            type={'text'}
            forItem={email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={faEnvelope}
            valid={[required, validEmail]}
            mandatory={true}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div className="row">
            {currentUser.roles.includes('ROLE_PARENT') && (
              <React.Fragment>
                <button
                  data-tip
                  data-for="archiveDownload"
                  className="btn btn-secondary mx-2"
                  onClick={(e) => handleDownload(e, id)}
                >
                  <FontAwesomeIcon icon={faFileArchive} />
                </button>
                <ReactTooltip
                  id="archiveDownload"
                  place="bottom"
                  effect="solid"
                >
                  Archyvuoti ir parsisiųsti duomenis
                </ReactTooltip>
              </React.Fragment>
            )}
            <button
              style={{ padding: '6px 6px' }}
              type="submit"
              className="btn btn-success mx-auto"
              disabled={getButtonState()}
            >
              Atnaujinti
            </button>
            {initialValue.name !== name ||
            initialValue.surename !== surname ||
            initialValue.email !== email ||
            +initialValue.phoneNum !== +phone ? (
              <button
                className="btn btn-danger"
                style={{ padding: '6px 8px', marginLeft: '10px' }}
                onClick={handleCancel}
              >
                Atšaukti
              </button>
            ) : (
              ''
            )}
          </div>
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
