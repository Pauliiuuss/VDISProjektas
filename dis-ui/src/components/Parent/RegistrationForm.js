import React, { Component } from 'react';
import Navbar from '../navbar.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faHome,
  faPhone,
  faEnvelope,
  faBirthdayCake,
} from '@fortawesome/free-solid-svg-icons';

export default class RegistrationForm extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <h2 className=" text-center text-success my-5">Naujas prašymas</h2>
        <form className="container text-secondary">
          <div className="row">
            <div className="col-lg-6">
              <h3 className="mb-4 text-center">Vaiko atstovas 1</h3>
              <div className="form-inline mb-3">
                <label className="my-auto col-4" htmlFor="vardasAtstovas1">
                  Vardas:
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                  </div>
                  <input
                    type="text"
                    id="vardasAtstovas1"
                    name="vardasAtstovas1"
                    className="form-control"
                    placeholder="Vardas"
                  />
                </div>
              </div>
              <div className="form-inline mb-3">
                <label className="my-auto col-4" htmlFor="pavardeAtstovas1">
                  Pavardė:
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                  </div>
                  <input
                    type="text"
                    id="pavardeAtstovas1"
                    name="pavardeAtstovas1"
                    className="form-control"
                    placeholder="Pavardė"
                  />
                </div>
              </div>
              <div className="form-inline mb-3">
                <label className="my-auto col-4" htmlFor="kodasAtstovas1">
                  Asmens kodas:
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                  </div>
                  <input
                    type="number"
                    id="kodasAtstovas1"
                    name="kodasAtstovas1"
                    className="form-control"
                    placeholder="Asmens kodas"
                  />
                </div>
              </div>
              <div className="form-inline mb-3">
                <label className="my-auto col-4" htmlFor="adresasAtstovas1">
                  Gyvenamosios vietos adresas:
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faHome} />
                    </span>
                  </div>
                  <input
                    type="text"
                    id="adresasAtstovas1"
                    name="adresasAtstovas1"
                    className="form-control"
                    placeholder="Adresas"
                  />
                </div>
              </div>
              <div className="form-inline mb-3">
                <label className="my-auto col-4" htmlFor="miestasAtstovas1">
                  Miestas:
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faHome} />
                    </span>
                  </div>
                  <input
                    type="text"
                    id="miestasAtstovas1"
                    name="miestasAtstovas1"
                    className="form-control"
                    placeholder="Miestas"
                  />
                </div>
              </div>
              <div className="form-inline mb-3">
                <label className="my-auto col-4" htmlFor="telAtstovas1">
                  Telefonas:
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faPhone} />
                    </span>
                  </div>
                  <input
                    type="number"
                    id="telAtstovas1"
                    name="telAtstovas1"
                    className="form-control"
                    placeholder="Telefonas"
                  />
                </div>
              </div>
              <div className="form-inline mb-3">
                <label className="my-auto col-4" htmlFor="elpastasAtstovas1">
                  El.paštas:
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                  </div>
                  <input
                    type="email"
                    id="elpastasAtstovas1"
                    name="elpastasAtstovas1"
                    className="form-control"
                    placeholder="El.paštas"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <h3 className="mb-4 text-center">Vaiko atstovas 2</h3>
              <div className="form-inline mb-3">
                <label className="my-auto col-4" htmlFor="vardasAtstovas2">
                  Vardas:
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                  </div>
                  <input
                    type="text"
                    id="vardasAtstovas2"
                    name="vardasAtstovas2"
                    className="form-control"
                    placeholder="Vardas"
                  />
                </div>
              </div>
              <div className="form-inline mb-3">
                <label className="my-auto col-4" htmlFor="pavardeAtstovas2">
                  Pavardė:
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                  </div>
                  <input
                    type="text"
                    id="pavardeAtstovas2"
                    name="pavardeAtstovas2"
                    className="form-control"
                    placeholder="Pavardė"
                  />
                </div>
              </div>
              <div className="form-inline mb-3">
                <label className="my-auto col-4" htmlFor="kodasAtstovas2">
                  Asmens kodas:
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                  </div>
                  <input
                    type="number"
                    id="kodasAtstovas1"
                    name="kodasAtstovas1"
                    className="form-control"
                    placeholder="Asmens kodas"
                  />
                </div>
              </div>
              <div className="form-inline mb-3">
                <label className="my-auto col-4" htmlFor="adresasAtstovas2">
                  Gyvenamosios vietos adresas:
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faHome} />
                    </span>
                  </div>
                  <input
                    type="text"
                    id="adresasAtstovas2"
                    name="adresasAtstovas2"
                    className="form-control"
                    placeholder="Adresas"
                  />
                </div>
              </div>
              <div className="form-inline mb-3">
                <label className="my-auto col-4" htmlFor="miestasAtstovas2">
                  Miestas:
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faHome} />
                    </span>
                  </div>
                  <input
                    type="text"
                    id="miestasAtstovas2"
                    name="miestasAtstovas2"
                    className="form-control"
                    placeholder="Miestas"
                  />
                </div>
              </div>
              <div className="form-inline mb-3">
                <label className="my-auto col-4" htmlFor="telAtstovas2">
                  Telefonas:
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faPhone} />
                    </span>
                  </div>
                  <input
                    type="number"
                    id="telAtstovas2"
                    name="telAtstovas2"
                    className="form-control"
                    placeholder="Telefonas"
                  />
                </div>
              </div>
              <div className="form-inline mb-3">
                <label className="my-auto col-4" htmlFor="elpastasAtstovas2">
                  El.paštas:
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faEnvelope} />
                    </span>
                  </div>
                  <input
                    type="email"
                    id="elpastasAtstovas2"
                    name="elpastasAtstovas2"
                    className="form-control"
                    placeholder="El.paštas"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <h3 className="mt-5 mb-4 text-center">Vaiko informacija</h3>
              <div className="form-inline mb-3">
                <label className="my-auto col-4" htmlFor="vaikoVardas">
                  Vardas:
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                  </div>
                  <input
                    type="text"
                    id="vaikoVardas"
                    name="vaikoVardas"
                    className="form-control"
                    placeholder="Vardas"
                  />
                </div>
              </div>
              <div className="form-inline mb-3">
                <label className="my-auto col-4" htmlFor="vaikoPavarde">
                  Pavardė:
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                  </div>
                  <input
                    type="text"
                    id="vaikoPavarde"
                    name="vaikoPavarde"
                    className="form-control"
                    placeholder="Pavardė"
                  />
                </div>
              </div>
              <div className="form-inline mb-3">
                <label className="my-auto col-4" htmlFor="vaikoKodas">
                  Asmens kodas:
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                  </div>
                  <input
                    type="number"
                    id="vaikoKodas"
                    name="vaikoKodas"
                    className="form-control"
                    placeholder="Asmens kodas"
                  />
                </div>
              </div>
              <div className="form-inline mb-3">
                <label className="my-auto col-4" htmlFor="gimimoData">
                  Gimimo data:
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faBirthdayCake} />
                    </span>
                  </div>
                  <input
                    type="date"
                    id="gimimoData"
                    name="gimimoData"
                    className="form-control"
                    placeholder="Gimimo data"
                  />
                </div>
              </div>
              <div className="form-inline mb-3">
                <label className="my-auto col-4" htmlFor="vaikoAdresas">
                  Gyvenamosios vietos adresas:
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faHome} />
                    </span>
                  </div>
                  <input
                    type="text"
                    id="vaikoAdresas"
                    name="vaikoAdresas"
                    className="form-control"
                    placeholder="Adresas"
                  />
                </div>
              </div>
              <div className="form-inline mb-3">
                <label className="my-auto col-4" htmlFor="vaikoMiestas">
                  Miestas:
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faHome} />
                    </span>
                  </div>
                  <input
                    type="text"
                    id="vaikoMiestas"
                    name="vaikoMiestas"
                    className="form-control"
                    placeholder="Miestas"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <h3 className="mb-4 mt-5 text-center">
                Pasirinkite darželį (prioriteto mažėjimo tvarka):
              </h3>
              <div className="form-group ">
                <div className="form-inline">
                  <label className="col-2" htmlFor="1prioritetas">
                    1 prioritetas
                  </label>
                  <select className="form-control col-5" id="1prioritetas">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
                <div className="form-inline">
                  <label className="col-2" htmlFor="1prioritetas">
                    1 prioritetas
                  </label>
                  <select className="form-control col-5" id="1prioritetas">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
                <div className="form-inline">
                  <label className="col-2" htmlFor="1prioritetas">
                    1 prioritetas
                  </label>
                  <select className="form-control col-5" id="1prioritetas">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
                <div className="form-inline">
                  <label className="col-2" htmlFor="1prioritetas">
                    1 prioritetas
                  </label>
                  <select className="form-control col-5" id="1prioritetas">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
                <div className="form-inline">
                  <label className="col-2" htmlFor="1prioritetas">
                    1 prioritetas
                  </label>
                  <select className="form-control col-5" id="1prioritetas">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
