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
  constructor(props) {
    super(props);
    this.state = {
      vardasAtstovas1: '',
      pavardeAtstovas1: '',
      kodasAtstovas1: '',
      adresasAtstovas1: '',
      miestasAtstovas1: '',
      telAtstovas1: '',
      elpastasAtstovas1: '',
      vardasAtstovas2: '',
      pavardeAtstovas2: '',
      kodasAtstovas2: '',
      adresasAtstovas2: '',
      miestasAtstovas2: '',
      telAtstovas2: '',
      elpastasAtstovas2: '',
      vaikoVardas: '',
      vaikoPavarde: '',
      vaikoKodas: '',
      gimimoData: '',
      vaikoAdresas: '',
      vaikoMiestas: '',

      //   selectKindergarten: {
      //     prioritetas1: '',
      //     prioritetas2: '',
      //     prioritetas3: '',
      //     prioritetas4: '',
      //     prioritetas5: '',
      //   },
      //   selectPriorityOptions: {
      //     deklaruota: '',
      //     ivaikintas: '',
      //     daugiavaike: '',
      //     mokosiTevas: '',
      //     nedarbingumas: '',
      //   },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.push('/dis-app/application');

    this.setState({
      vardasAtstovas1: '',
      pavardeAtstovas1: '',
      kodasAtstovas1: '',
      adresasAtstovas1: '',
      miestasAtstovas1: '',
      telAtstovas1: '',
      elpastasAtstovas1: '',
      vardasAtstovas2: '',
      pavardeAtstovas2: '',
      kodasAtstovas2: '',
      adresasAtstovas2: '',
      miestasAtstovas2: '',
      telAtstovas2: '',
      elpastasAtstovas2: '',
      vaikoVardas: '',
      vaikoPavarde: '',
      vaikoKodas: '',
      gimimoData: '',
      vaikoAdresas: '',
      vaikoMiestas: '',
      kindergarten: '',
    });
  };

  kindergartenDropdownSelect = (e) => {
    e.preventDefault();
    this.setState({
      kindergarten: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <Navbar />
        <h2 className=" text-center text-success my-5">Naujas prašymas</h2>
        <form className="container text-secondary" onSubmit={this.handleSubmit}>
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
                    value={this.state.vardasAtstovas1}
                    onChange={this.handleChange}
                    required="required"
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
                    value={this.state.pavardeAtstovas1}
                    onChange={this.handleChange}
                    required="required"
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
                    value={this.state.kodasAtstovas1}
                    onChange={this.handleChange}
                    required="required"
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
                    value={this.state.adresasAtstovas1}
                    onChange={this.handleChange}
                    required="required"
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
                    value={this.state.miestasAtstovas1}
                    onChange={this.handleChange}
                    required="required"
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
                    value={this.state.telAtstovas1}
                    onChange={this.handleChange}
                    required="required"
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
                    value={this.state.elpastasAtstovas1}
                    onChange={this.handleChange}
                    required="required"
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
                    value={this.state.vardasAtstovas2}
                    onChange={this.handleChange}
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
                    value={this.state.pavardeAtstovas2}
                    onChange={this.handleChange}
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
                    value={this.state.kodasAtstovas2}
                    onChange={this.handleChange}
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
                    value={this.state.adresasAtstovas2}
                    onChange={this.handleChange}
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
                    value={this.state.miestasAtstovas2}
                    onChange={this.handleChange}
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
                    value={this.state.telAtstovas2}
                    onChange={this.handleChange}
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
                    value={this.state.elpastasAtstovas2}
                    onChange={this.handleChange}
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
                    value={this.state.vaikoVardas}
                    onChange={this.handleChange}
                    required="required"
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
                    value={this.state.vaikoPavarde}
                    onChange={this.handleChange}
                    required="required"
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
                    value={this.state.vaikoKodas}
                    onChange={this.handleChange}
                    required="required"
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
                    value={this.state.gimimoData}
                    onChange={this.handleChange}
                    required="required"
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
                    value={this.state.vaikoAdresas}
                    onChange={this.handleChange}
                    required="required"
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
                    value={this.state.vaikoMiestas}
                    onChange={this.handleChange}
                    required="required"
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
              <div className="form-group">
                <div className="form-inline mb-4">
                  <label className="col-2" htmlFor="prioritetas1">
                    1 prioritetas
                  </label>
                  <select
                    className="form-control col-5"
                    id="selectprior1"
                    value={this.state.kindergarten}
                    onChange={this.kindergartenDropdownSelect}
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
                <div className="form-inline mb-4">
                  <label className="col-2" htmlFor="prioritetas2">
                    2 prioritetas
                  </label>
                  <select className="form-control col-5" id="prioritetas2">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
                <div className="form-inline mb-4">
                  <label className="col-2" htmlFor="prioritetas3">
                    3 prioritetas
                  </label>
                  <select className="form-control col-5" id="prioritetas3">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
                <div className="form-inline mb-4">
                  <label className="col-2" htmlFor="prioritetas4">
                    4 prioritetas
                  </label>
                  <select className="form-control col-5" id="prioritetas4">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
                <div className="form-inline mb-4">
                  <label className="col-2" htmlFor="prioritetas5">
                    5 prioritetas
                  </label>
                  <select className="form-control col-5" id="prioritetas5">
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
          <div className="row">
            <div className="col-lg-12">
              <h3 className="mb-4 mt-5 text-center">
                Pažymėkite visas atitinkančias sąlygas:
              </h3>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="deklaruota"
                  name="deklaruota"
                />
                <label className="form-check-label" htmlFor="defaultCheck1">
                  Deklaruota gyvenomoji vieta Vilniaus m.
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="ivaikintas"
                  name="ivaikintas"
                />
                <label className="form-check-label" htmlFor="defaultCheck1">
                  Vaikas įvaikintas
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="daugiavaike"
                  name="daugiavaike"
                />
                <label className="form-check-label" htmlFor="defaultCheck1">
                  Šeimoje yra 3 ir daugiau vaikų, besimokančių bendro ugdymo
                  programose
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="mokosTevas"
                  name="mokosiTevas"
                />
                <label className="form-check-label" htmlFor="defaultCheck1">
                  Vienas iš tėvų(globėjų) mokosi bendro ugdymo mokykloje
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  name="nedarbingumas"
                  id="nedarbingumas"
                />
                <label className="form-check-label" htmlFor="defaultCheck1">
                  Vienas iš tėvų(globėjų) turi ne daugiau kaip 40 proc.
                  nedarbingumo lygio
                </label>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-success my-5">
            Pateikti prašymą
          </button>
        </form>
      </div>
    );
  }
}
