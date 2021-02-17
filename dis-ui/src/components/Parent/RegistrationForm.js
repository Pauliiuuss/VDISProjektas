import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from '../navbar.component';
import {
  faUser,
  faHome,
  faPhone,
  faEnvelope,
  faBirthdayCake,
} from '@fortawesome/free-solid-svg-icons';
import SpecService from '../../services/spec.service';
import ParentService from '../../services/parent.service';
import UserService from '../../services/user.service';
import RenderInput from './RenderInput';
import RenderSelect from './RenderSelect';
import RenderCheck from './RenderCheck';
import AuthService from '../../services/auth.service';
import CheckButton from 'react-validation/build/button';
import Form from 'react-validation/build/form';
import {
  required,
  validPersonalCode,
  validPhoneNumber,
  validEmail,
} from './Validation';

var today = new Date(),
  date =
    today.getFullYear() +
    '-' +
    ('0' + (today.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + today.getDate()).slice(-2);

export default class RegistrationForm extends Component {
  state = {
    date: date,
    message: '',
    successful: false,
    currentUser: '',
    redirect: null,
    userReady: false,
    roles: '',
    userData: '',
    checked: false,
    loading: false,

    kindergartens: [],
    kindergarten1: 'Pasirinkti darželį iš sąrašo...',
    kindergarten2: 'Pasirinkti darželį iš sąrašo...',
    kindergarten3: 'Pasirinkti darželį iš sąrašo...',
    kindergarten4: 'Pasirinkti darželį iš sąrašo...',
    kindergarten5: 'Pasirinkti darželį iš sąrašo...',
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
    selectedPriority: true,
    inCity: false,
    adopted: false,
    threeOrMore: false,
    parentStudent: false,
    handicapped: false,
  };

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    const userData = UserService.getUserData(currentUser.id);
    SpecService.getKindergartens()
      .then((result) => {
        this.setState({ kindergartens: result.data, userData });
      })
      .catch((err) => {
        console.log(err);
      });
    if (!currentUser) this.setState({ redirect: '/dis-app/' });
    this.setState({
      currentUser: currentUser,
      userReady: true,
      roles: currentUser.roles,
    });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const {
      vaikoVardas,
      vaikoPavarde,
      gimimoData,
      vaikoAdresas,
      vaikoMiestas,
      inCity,
      adopted,
      threeOrMore,
      parentStudent,
      handicapped,
      vardasAtstovas1,
      pavardeAtstovas1,
      kodasAtstovas1,
      adresasAtstovas1,
      miestasAtstovas1,
      telAtstovas1,
      elpastasAtstovas1,
      vaikoKodas,
      vardasAtstovas2,
      pavardeAtstovas2,
      kodasAtstovas2,
      adresasAtstovas2,
      miestasAtstovas2,
      telAtstovas2,
      elpastasAtstovas2,
      kindergarten1,
      kindergarten2,
      kindergarten3,
      kindergarten4,
      kindergarten5,
    } = this.state;

    if (
      vaikoVardas === '' ||
      vaikoPavarde === '' ||
      vaikoAdresas === '' ||
      vaikoMiestas === '' ||
      vardasAtstovas1 === '' ||
      pavardeAtstovas1 === '' ||
      adresasAtstovas1 === '' ||
      miestasAtstovas1 === '' ||
      elpastasAtstovas1 === ''
    ) {
      this.setState({
        successful: false,
        message: 'Privalomi laukai negali būti tušti!',
        loading: false,
      });
      return;
    }

    if (
      vaikoKodas.toString().length !== 11 ||
      kodasAtstovas1.toString().length !== 11
    ) {
      this.setState({
        successful: false,
        message: 'Neteisingas asmens kodo ilgis!',
        loading: false,
      });
      return;
    }

    if (telAtstovas1.toString().length !== 8) {
      this.setState({
        successful: false,
        message: 'Neteisingas telefono numerio ilgis!',
        loading: false,
      });
      return;
    }

    if (this.state.kindergarten1 === 'Pasirinkti darželį iš sąrašo...') {
      this.setState({
        successful: false,
        message:
          'Privaloma pasirinkti bent vieną darželio prioritetą(1 prioritetas)!',
        loading: false,
      });
      return;
    }

    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
    }

    // this.props.history.push('/dis-app/home');

    await ParentService.sendForm({
      address: vaikoAdresas,
      adopted,
      birthDate: gimimoData,
      city: vaikoMiestas,
      handicapped,
      idFront: this.state.currentUser.id,
      inCity,
      kindergartenPriority: {
        kindergartenFive: kindergarten5,
        kindergartenFour: kindergarten4,
        kindergartenOne: kindergarten1,
        kindergartenThree: kindergarten3,
        kindergartenTwo: kindergarten2,
      },
      name: vaikoVardas,
      personId: vaikoKodas,
      parentData: {
        address: adresasAtstovas1,
        city: miestasAtstovas1,
        email: elpastasAtstovas1,
        name: vardasAtstovas1,
        personId: kodasAtstovas1,
        phoneNum: telAtstovas1,
        surename: pavardeAtstovas1,
      },
      secondParentData: {
        address: adresasAtstovas2,
        city: miestasAtstovas2,
        email: elpastasAtstovas2,
        name: vardasAtstovas2,
        personId: kodasAtstovas2,
        phoneNum: telAtstovas2,
        surename: pavardeAtstovas2,
      },
      parentStudent,
      postDate: date,
      surename: vaikoPavarde,
      threeOrMore,
    }).then(
      (response) => {
        this.setState({
          successful: true,
          message: response.data.message,
          loading: true,
        });
        this.resetState();
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
          loading: false,
        });
      }
    );
  };

  resetState = () => {
    this.setState({
      kindergartens: [],
      kindergarten1: 'Pasirinkti darželį iš sąrašo...',
      kindergarten2: 'Pasirinkti darželį iš sąrašo...',
      kindergarten3: 'Pasirinkti darželį iš sąrašo...',
      kindergarten4: 'Pasirinkti darželį iš sąrašo...',
      kindergarten5: 'Pasirinkti darželį iš sąrašo...',
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
      selectedPriority: true,
      inCity: false,
      adopted: false,
      threeOrMore: false,
      parentStudent: false,
      handicapped: false,
    });
  };

  kindergartenDropdownSelect = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSelectChange = (e) => {
    const value = this.state[e.target.name];
    console.log(value);
    this.setState({
      [e.target.name]: !value,
    });
  };

  handleVaikoAtstovas2filling = (e) => {
    this.setState({
      checked: !this.state.checked,
    });
  };

  render() {
    if (this.state.redirect) return <Redirect to={this.state.redirect} />;
    return (
      <div>
        <Navbar />
        <h2 className=" text-center text-success my-5">Naujas prašymas</h2>
        <Form
          className="container text-secondary"
          onSubmit={this.handleSubmit}
          ref={(c) => {
            this.form = c;
          }}
        >
          <div className="row">
            <div className="col-lg-6">
              <h3 className="mb-4 text-center">Vaiko atstovas 1</h3>
              <RenderInput
                type={'text'}
                forItem={'vardasAtstovas1'}
                inputPlaceholder={'Vardas'}
                value={this.state.vardasAtstovas1}
                onChange={this.handleChange}
                icon={faUser}
                valid={[required]}
                mandatory={true}
              />
              <RenderInput
                type={'text'}
                forItem={'pavardeAtstovas1'}
                inputPlaceholder={'Pavardė'}
                value={this.state.pavardeAtstovas1}
                onChange={this.handleChange}
                icon={faUser}
                valid={[required]}
                mandatory={true}
              />
              <RenderInput
                type={'number'}
                forItem={'kodasAtstovas1'}
                inputPlaceholder={'Asmens kodas'}
                value={this.state.kodasAtstovas1}
                onChange={this.handleChange}
                icon={faUser}
                valid={[required, validPersonalCode]}
                mandatory={true}
              />
              <RenderInput
                type={'text'}
                forItem={'adresasAtstovas1'}
                inputPlaceholder={'Adresas'}
                value={this.state.adresasAtstovas1}
                onChange={this.handleChange}
                icon={faHome}
                valid={[required]}
                mandatory={true}
              />
              <RenderInput
                type={'text'}
                forItem={'miestasAtstovas1'}
                inputPlaceholder={'Miestas'}
                value={this.state.miestasAtstovas1}
                onChange={this.handleChange}
                icon={faHome}
                valid={[required]}
                mandatory={true}
              />
              <RenderInput
                type={'number'}
                forItem={'telAtstovas1'}
                inputPlaceholder={'Telefonas'}
                value={this.state.telAtstovas1}
                onChange={this.handleChange}
                icon={faPhone}
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
                type={'email'}
                forItem={'elpastasAtstovas1'}
                inputPlaceholder={'El.paštas'}
                value={this.state.elpastasAtstovas1}
                onChange={this.handleChange}
                icon={faEnvelope}
                valid={[required, validEmail]}
                mandatory={true}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <h3 className="mt-4 mb-2 text-center">Vaiko atstovas 2</h3>
              <div className="form-check pl-5">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={this.handleVaikoAtstovas2filling}
                  checked={this.state.checked}
                />
                <label
                  className="form-check-label mb-3"
                  htmlFor="vaikoAtstovas2"
                >
                  Pildyti informaciją
                </label>
              </div>
            </div>
          </div>
          <div className="row">
            {this.state.checked ? (
              <div className="col-lg-6">
                <RenderInput
                  type={'text'}
                  forItem={'vardasAtstovas2'}
                  inputPlaceholder={'Vardas'}
                  value={this.state.vardasAtstovas2}
                  onChange={this.handleChange}
                  icon={faUser}
                  mandatory={true}
                  valid={[required]}
                />
                <RenderInput
                  type={'text'}
                  forItem={'pavardeAtstovas2'}
                  inputPlaceholder={'Pavardė'}
                  value={this.state.pavardeAtstovas2}
                  onChange={this.handleChange}
                  icon={faUser}
                  mandatory={true}
                  valid={[required]}
                />
                <RenderInput
                  type={'number'}
                  forItem={'kodasAtstovas2'}
                  inputPlaceholder={'Asmens kodas'}
                  value={this.state.kodasAtstovas2}
                  onChange={this.handleChange}
                  icon={faUser}
                  valid={[required, validPersonalCode]}
                  mandatory={true}
                />
                <RenderInput
                  type={'text'}
                  forItem={'adresasAtstovas2'}
                  inputPlaceholder={'Adresas'}
                  value={this.state.adresasAtstovas2}
                  onChange={this.handleChange}
                  icon={faHome}
                  mandatory={true}
                  valid={[required]}
                />
                <RenderInput
                  type={'text'}
                  forItem={'miestasAtstovas2'}
                  inputPlaceholder={'Miestas'}
                  value={this.state.miestasAtstovas2}
                  onChange={this.handleChange}
                  icon={faHome}
                  mandatory={true}
                />
                <RenderInput
                  type={'number'}
                  forItem={'telAtstovas2'}
                  inputPlaceholder={'Telefonas'}
                  value={this.state.telAtstovas2}
                  onChange={this.handleChange}
                  icon={faPhone}
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
                  type={'email'}
                  forItem={'elpastasAtstovas2'}
                  inputPlaceholder={'El.paštas'}
                  value={this.state.elpastasAtstovas2}
                  onChange={this.handleChange}
                  icon={faEnvelope}
                  valid={[required, validEmail]}
                  mandatory={true}
                />
              </div>
            ) : null}
          </div>
          <div className="row">
            <div className="col-lg-6">
              <h3 className="mt-5 mb-4 text-center">Vaiko informacija</h3>
              <RenderInput
                type={'text'}
                forItem={'vaikoVardas'}
                inputPlaceholder={'Vardas'}
                value={this.state.vaikoVardas}
                onChange={this.handleChange}
                icon={faUser}
                valid={[required]}
                mandatory={true}
              />
              <RenderInput
                type={'text'}
                forItem={'vaikoPavarde'}
                inputPlaceholder={'Pavardė'}
                value={this.state.vaikoPavarde}
                onChange={this.handleChange}
                icon={faUser}
                valid={[required]}
                mandatory={true}
              />
              <RenderInput
                type={'number'}
                forItem={'vaikoKodas'}
                inputPlaceholder={'Asmens kodas'}
                value={this.state.vaikoKodas}
                onChange={this.handleChange}
                icon={faUser}
                valid={[required, validPersonalCode]}
                mandatory={true}
              />

              <RenderInput
                type={'date'}
                forItem={'gimimoData'}
                inputPlaceholder={'Gimimo data'}
                value={this.state.gimimoData}
                onChange={this.handleChange}
                icon={faBirthdayCake}
                valid={[required]}
                mandatory={true}
              />

              <RenderInput
                type={'text'}
                forItem={'vaikoAdresas'}
                inputPlaceholder={'Adresas'}
                value={this.state.vaikoAdresas}
                onChange={this.handleChange}
                icon={faHome}
                valid={[required]}
                mandatory={true}
              />
              <RenderInput
                type={'text'}
                forItem={'vaikoMiestas'}
                inputPlaceholder={'Miestas'}
                value={this.state.vaikoMiestas}
                onChange={this.handleChange}
                icon={faHome}
                valid={[required]}
                mandatory={true}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <h3 className="mb-4 mt-5 text-center">
                Pasirinkite darželį (prioriteto mažėjimo tvarka):
                <span className="text-danger" style={{ fontSize: 25 }}>
                  *
                </span>
              </h3>
              <div className="form-group">
                <RenderSelect
                  forItem={'kindergarten1'}
                  inputPlaceholder={'1 prioritetas'}
                  value={this.state.kindergarten1}
                  onChange={this.kindergartenDropdownSelect}
                  kindergartens={this.state.kindergartens}
                />
                <RenderSelect
                  forItem={'kindergarten2'}
                  inputPlaceholder={'2 prioritetas'}
                  value={this.state.kindergarten2}
                  onChange={this.kindergartenDropdownSelect}
                  kindergartens={this.state.kindergartens}
                />
                <RenderSelect
                  forItem={'kindergarten3'}
                  inputPlaceholder={'3 prioritetas'}
                  value={this.state.kindergarten3}
                  onChange={this.kindergartenDropdownSelect}
                  kindergartens={this.state.kindergartens}
                />

                <RenderSelect
                  forItem={'kindergarten4'}
                  inputPlaceholder={'4 prioritetas'}
                  value={this.state.kindergarten4}
                  onChange={this.kindergartenDropdownSelect}
                  kindergartens={this.state.kindergartens}
                />

                <RenderSelect
                  forItem={'kindergarten5'}
                  inputPlaceholder={'5 prioritetas'}
                  value={this.state.kindergarten5}
                  onChange={this.kindergartenDropdownSelect}
                  kindergartens={this.state.kindergartens}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <h3 className="mb-4 mt-5 text-center">
                Pažymėkite visas atitinkančias sąlygas:
              </h3>
              <RenderCheck
                onChange={this.handleSelectChange}
                forItem={'inCity'}
                checked={this.state.inCity}
                label={'Deklaruota gyvenomoji vieta Vilniaus m.'}
              />
              <RenderCheck
                onChange={this.handleSelectChange}
                forItem={'adopted'}
                checked={this.state.adopted}
                label={'Vaikas įvaikintas.'}
              />
              <RenderCheck
                onChange={this.handleSelectChange}
                forItem={'threeOrMore'}
                checked={this.state.threeOrMore}
                label={
                  'Šeimoje yra 3 ir daugiau vaikų, besimokančių bendro ugdymo programose.'
                }
              />
              <RenderCheck
                onChange={this.handleSelectChange}
                forItem={'parentStudent'}
                checked={this.state.parentStudent}
                label={
                  'Vienas iš tėvų(globėjų) mokosi bendro ugdymo mokykloje.'
                }
              />
              <RenderCheck
                onChange={this.handleSelectChange}
                forItem={'handicapped'}
                checked={this.state.handicapped}
                label={
                  'Vienas iš tėvų(globėjų) turi ne daugiau kaip 40 proc nedarbingumo lygio'
                }
              />
            </div>
          </div>
          <button type="submit" className="btn btn-success my-5">
            Pateikti prašymą
          </button>
          {this.state.message && (
            <div className="form-group">
              <div
                className={
                  this.state.successful
                    ? 'alert alert-success'
                    : 'alert alert-danger'
                }
                role="alert"
              >
                {this.state.message}
              </div>
            </div>
          )}
          <CheckButton
            style={{ display: 'none' }}
            ref={(c) => {
              this.checkBtn = c;
            }}
          />
        </Form>
      </div>
    );
  }
}
