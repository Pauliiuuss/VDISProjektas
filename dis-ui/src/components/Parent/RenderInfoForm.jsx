import React, { Component } from 'react';
import ParentService from '../../services/parent.service';
import CheckButton from 'react-validation/build/button';
import {
  faUser,
  faHome,
  faPhone,
  faEnvelope,
  faBirthdayCake,
} from '@fortawesome/free-solid-svg-icons';
import Form from 'react-validation/build/form';
import RenderInput from './RenderInput';
import RenderSelect from './RenderSelectForModal';
import RenderCheck from './RenderCheck';
import SpecService from '../../services/spec.service';
import AuthService from '../../services/auth.service';
import UserService from '../../services/user.service';
import { required } from './Validation';

class RenderInfoForm extends Component {
  state = {
    loading: true,
    unlockSecondParent: false,
    message: '',
    successful: false,
    currentUser: '',
    kindergartens: [],
    disabled: true,
    showId: '',
    data: {
      address: '',
      adopted: false,
      birthDate: '',
      city: '',
      formStatus: {
        id: '',
        name: '',
      },
      handicapped: false,
      id: '',
      inCity: false,
      kindergartenPriority: {
        id: '',
        kindergartenFive: 'Pasirinkti darželį iš sąrašo...',
        kindergartenFour: 'Pasirinkti darželį iš sąrašo...',
        kindergartenOne: 'Pasirinkti darželį iš sąrašo...',
        kindergartenThree: 'Pasirinkti darželį iš sąrašo...',
        kindergartenTwo: 'Pasirinkti darželį iš sąrašo...',
      },
      name: '',
      parentData: {
        address: '',
        city: '',
        email: '',
        id: '',
        name: '',
        personId: '',
        phoneNum: '',
        surename: '',
      },
      secondParentData: {
        address: '',
        city: '',
        email: '',
        id: '',
        name: '',
        personId: '',
        phoneNum: '',
        surename: '',
      },
      parentStudent: false,
      personId: '',
      postDate: '',
      surename: '',
      threeOrMore: true,
    },
  };

  componentDidMount() {
    const { showId } = this.props;
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
    if (showId !== '')
      ParentService.getAllData(showId).then(
        (response) => {
          const data = response.data;
          this.setState({ data });
        },
        (error) => {
          console.log(error);
        }
      );
    this.setState({ loading: false });
  }

  unlockForm = (e) => {
    e.preventDefault();
    const action = !this.state.disabled;
    this.setState({ disabled: action });
    if (this.state.unlockSecondParent)
      this.setState({
        unlockSecondParent: false,
        data: {
          ...this.state.data,
          secondParentData: null,
        },
      });
  };

  deleteForm = (e) => {
    e.preventDefault();
    console.log('Delete form');
  };

  confirmForm = (e) => {
    e.preventDefault();
    if (
      this.state.data.name === '' ||
      this.state.data.surename === '' ||
      this.state.data.address === '' ||
      this.state.data.city === '' ||
      this.state.data.parentData.name === '' ||
      this.state.data.parentData.surename === '' ||
      this.state.data.parentData.address === '' ||
      this.state.data.parentData.city === '' ||
      this.state.data.parentData.email === ''
    ) {
      this.setState({
        successful: false,
        message: 'Privalomi laukai negali būti tušti!',
      });
      return;
    }
    if (
      this.state.data.name === '' ||
      this.state.data.surename === '' ||
      this.state.data.address === '' ||
      this.state.data.city === '' ||
      this.state.data.parentData.name === '' ||
      this.state.data.parentData.surename === '' ||
      this.state.data.parentData.address === '' ||
      this.state.data.parentData.city === '' ||
      this.state.data.parentData.email === ''
    ) {
      this.setState({
        successful: false,
        message: 'Privalomi laukai negali būti tušti!',
      });
      return;
    }

    if (
      this.state.data.personId.toString().length !== 11 ||
      this.state.data.parentData.personId.toString().length !== 11
    ) {
      this.setState({
        successful: false,
        message: 'Neteisingas asmens kodo ilgis!',
      });
      return;
    }

    if (this.state.data.parentData.phoneNum.toString().length !== 8) {
      this.setState({
        successful: false,
        message: 'Neteisingas telefono numerio ilgis!',
      });
      return;
    }

    if (
      this.state.data.kindergartenPriority.kindergartenOne ===
      'Pasirinkti darželį iš sąrašo...'
    ) {
      this.setState({
        successful: false,
        message:
          'Privaloma pasirinkti bent vieną darželio prioritetą(1 prioritetas)!',
      });
      return;
    }

    if (this.state.unlockSecondParent) {
      if (
        this.state.data.secondParentData.name === '' ||
        this.state.data.secondParentData.surename === '' ||
        this.state.data.secondParentData.address === '' ||
        this.state.data.secondParentData.city === '' ||
        this.state.data.secondParentData.email === ''
      ) {
        this.setState({
          successful: false,
          message: 'Privalomi laukai negali būti tušti!',
        });
        return;
      }

      if (this.state.data.secondParentData.personId.toString().length !== 11) {
        this.setState({
          successful: false,
          message: 'Neteisingas asmens kodo ilgis!',
        });
        return;
      }

      if (this.state.data.secondParentData.phoneNum.toString().length !== 8) {
        this.setState({
          successful: false,
          message: 'Neteisingas telefono numerio ilgis!',
        });
        return;
      }
    }

    console.log('Confirm form');
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
  };

  handleSelectChange = (e) => {
    const value = this.state.data[e.target.name];
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

  handleChangeForSecondParent = (e) => {
    const { name, value } = e.target;
    this.setState({
      data: {
        ...this.state.data,
        secondParentData: {
          ...this.state.data.secondParentData,
          [name]: value,
        },
      },
    });
    console.log(this.state.data.secondParentData);
  };

  unlockSecondParent = (e) => {
    e.preventDefault();
    this.setState({
      unlockSecondParent: true,
      data: {
        ...this.state.data,
        secondParentData: {
          address: '',
          city: '',
          email: '',
          id: '',
          name: '',
          personId: '',
          phoneNum: '',
          surename: '',
        },
      },
    });
  };

  lockSecondParent = (e) => {
    e.preventDefault();
    this.setState({
      unlockSecondParent: false,
      data: {
        ...this.state.data,
        secondParentData: null,
      },
    });
  };

  render() {
    if (this.state.data.personId === '')
      return (
        <div className="d-flex justify-content-center">
          <div
            className="spinner-border"
            style={{ width: '3rem', height: '3rem', marginTop: '3rem' }}
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );

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
            type={'text'}
            forItem={'name'}
            inputPlaceholder={'Vardas'}
            value={this.state.data.parentData.name}
            onChange={this.handleChange}
            icon={faUser}
            valid={[required]}
            mandatory={true}
            disabled={disabled}
          />
          <RenderInput
            type={'text'}
            forItem={'surename'}
            inputPlaceholder={'Pavardė'}
            value={this.state.data.parentData.surename}
            onChange={this.handleChange}
            icon={faUser}
            valid={[required]}
            mandatory={true}
            disabled={disabled}
          />
          <RenderInput
            type={'number'}
            forItem={'personId'}
            inputPlaceholder={'Asmens kodas'}
            value={this.state.data.parentData.personId}
            onChange={this.handleChange}
            icon={faUser}
            valid={[required]}
            mandatory={true}
            disabled={disabled}
          />
          <RenderInput
            type={'text'}
            forItem={'address'}
            inputPlaceholder={'Adresas'}
            value={this.state.data.parentData.address}
            onChange={this.handleChange}
            icon={faHome}
            valid={[required]}
            mandatory={true}
            disabled={disabled}
          />
          <RenderInput
            type={'text'}
            forItem={'city'}
            inputPlaceholder={'Miestas'}
            value={this.state.data.parentData.city}
            onChange={this.handleChange}
            icon={faHome}
            valid={[required]}
            mandatory={true}
            disabled={disabled}
          />
          <RenderInput
            type={'number'}
            forItem={'phoneNum'}
            inputPlaceholder={'Telefonas'}
            value={this.state.data.parentData.phoneNum}
            onChange={this.handleChange}
            icon={faPhone}
            valid={[required]}
            mandatory={true}
            disabled={disabled}
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
            type={'email'}
            forItem={'email'}
            inputPlaceholder={'El.paštas'}
            value={this.state.data.parentData.email}
            onChange={this.handleChange}
            icon={faEnvelope}
            valid={[required]}
            mandatory={true}
            disabled={disabled}
          />
        </div>
        <div>
          <h3 className="mb-4 text-center">Vaiko atstovas 2</h3>
          {this.state.unlockSecondParent || this.state.data.secondParentData ? (
            <div>
              <RenderInput
                type={'text'}
                forItem={'name'}
                inputPlaceholder={'Vardas'}
                value={this.state.data.secondParentData.name}
                onChange={this.handleChangeForSecondParent}
                icon={faUser}
                disabled={disabled}
                mandatory={true}
                valid={[required]}
              />
              <RenderInput
                type={'text'}
                forItem={'surename'}
                inputPlaceholder={'Pavardė'}
                value={this.state.data.secondParentData.surename}
                onChange={this.handleChangeForSecondParent}
                icon={faUser}
                disabled={disabled}
                mandatory={true}
              />
              <RenderInput
                type={'number'}
                forItem={'personId'}
                inputPlaceholder={'Asmens kodas'}
                value={this.state.data.secondParentData.personId}
                mandatory={true}
                onChange={this.handleChangeForSecondParent}
                icon={faUser}
                disabled={disabled}
              />
              <RenderInput
                type={'text'}
                forItem={'address'}
                mandatory={true}
                inputPlaceholder={'Adresas'}
                value={this.state.data.secondParentData.address}
                onChange={this.handleChangeForSecondParent}
                icon={faHome}
                disabled={disabled}
              />
              <RenderInput
                type={'text'}
                forItem={'city'}
                inputPlaceholder={'Miestas'}
                value={this.state.data.secondParentData.city}
                mandatory={true}
                onChange={this.handleChangeForSecondParent}
                icon={faHome}
                disabled={disabled}
              />
              <RenderInput
                type={'number'}
                forItem={'phoneNum'}
                inputPlaceholder={'Telefonas'}
                value={this.state.data.secondParentData.phoneNum}
                mandatory={true}
                onChange={this.handleChangeForSecondParent}
                icon={faPhone}
                disabled={disabled}
              />
              <RenderInput
                type={'email'}
                forItem={'email'}
                inputPlaceholder={'El.paštas'}
                value={this.state.data.secondParentData.email}
                onChange={this.handleChangeForSecondParent}
                mandatory={true}
                icon={faEnvelope}
                disabled={disabled}
              />
              {this.state.unlockSecondParent && (
                <div style={{ textAlign: 'center' }}>
                  <p>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={this.lockSecondParent}
                    >
                      Atšaukti
                    </button>
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center', alignContent: 'center' }}>
              <p>
                Duomenys nesuvesti{' '}
                {!this.state.disabled && (
                  <button
                    className="btn btn-sm btn-info"
                    onClick={this.unlockSecondParent}
                  >
                    Pridėti
                  </button>
                )}
              </p>
            </div>
          )}
        </div>
        <div>
          <h3 className="mt-5 mb-4 text-center">Vaiko informacija</h3>
          <RenderInput
            type={'text'}
            forItem={'name'}
            inputPlaceholder={'Vardas'}
            value={this.state.data.name}
            onChange={this.handleChangeForChild}
            icon={faUser}
            valid={[required]}
            mandatory={true}
            disabled={disabled}
          />
          <RenderInput
            type={'text'}
            forItem={'surename'}
            inputPlaceholder={'Pavardė'}
            value={this.state.data.surename}
            onChange={this.handleChangeForChild}
            icon={faUser}
            valid={[required]}
            mandatory={true}
            disabled={disabled}
          />
          <RenderInput
            type={'number'}
            forItem={'personId'}
            inputPlaceholder={'Asmens kodas'}
            value={this.state.data.personId}
            onChange={this.handleChangeForChild}
            icon={faUser}
            valid={[required]}
            mandatory={true}
            disabled={disabled}
          />
          <RenderInput
            type={'date'}
            forItem={'birthDate'}
            inputPlaceholder={'Gimimo data'}
            value={this.state.data.birthDate.substr(0, 10)}
            onChange={this.handleChangeForChild}
            icon={faBirthdayCake}
            valid={[required]}
            mandatory={true}
            disabled={disabled}
          />

          <RenderInput
            type={'text'}
            forItem={'address'}
            inputPlaceholder={'Adresas'}
            value={this.state.data.address}
            onChange={this.handleChangeForChild}
            icon={faHome}
            valid={[required]}
            mandatory={true}
            disabled={disabled}
          />
          <RenderInput
            type={'text'}
            forItem={'city'}
            inputPlaceholder={'Miestas'}
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
              forItem={'kindergartenOne'}
              inputPlaceholder={'1 prioritetas'}
              value={this.state.data.kindergartenPriority.kindergartenOne}
              onChange={this.kindergartenDropdownSelect}
              kindergartens={this.state.kindergartens}
              disabled={disabled}
            />
            <RenderSelect
              forItem={'kindergartenTwo'}
              inputPlaceholder={'2 prioritetas'}
              value={this.state.kindergartens.kindergartenTwo}
              onChange={this.kindergartenDropdownSelect}
              kindergartens={this.state.kindergartens}
              disabled={disabled}
            />
            <RenderSelect
              forItem={'kindergartenThree'}
              inputPlaceholder={'3 prioritetas'}
              value={this.state.kindergartens.kindergartenThree}
              onChange={this.kindergartenDropdownSelect}
              kindergartens={this.state.kindergartens}
              disabled={disabled}
            />

            <RenderSelect
              forItem={'kindergartenFour'}
              inputPlaceholder={'4 prioritetas'}
              value={this.state.kindergartens.kindergartenFour}
              onChange={this.kindergartenDropdownSelect}
              kindergartens={this.state.kindergartens}
              disabled={disabled}
            />

            <RenderSelect
              forItem={'kindergartenFive'}
              inputPlaceholder={'5 prioritetas'}
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
              forItem={'inCity'}
              checked={this.state.data.inCity}
              label={'Deklaruota gyvenomoji vieta Vilniaus m.'}
              disabled={disabled}
            />
            <RenderCheck
              onChange={this.handleSelectChange}
              forItem={'adopted'}
              checked={this.state.data.adopted}
              label={'Vaikas įvaikintas.'}
              disabled={disabled}
            />
            <RenderCheck
              onChange={this.handleSelectChange}
              forItem={'threeOrMore'}
              checked={this.state.data.threeOrMore}
              label={
                'Šeimoje yra 3 ir daugiau vaikų, besimokančių bendro ugdymo programose.'
              }
              disabled={disabled}
            />
            <RenderCheck
              onChange={this.handleSelectChange}
              forItem={'parentStudent'}
              checked={this.state.data.parentStudent}
              label={'Vienas iš tėvų(globėjų) mokosi bendro ugdymo mokykloje.'}
              disabled={disabled}
            />
            <RenderCheck
              onChange={this.handleSelectChange}
              forItem={'handicapped'}
              checked={this.state.data.handicapped}
              label={
                'Vienas iš tėvų(globėjų) turi ne daugiau kaip 40 proc nedarbingumo lygio'
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
              Atšaukti{' '}
            </button>
          </div>
        )}
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
    );
  }
}

export default RenderInfoForm;
