import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RegisteredForms from './ListOfForms/RegisteredForms';
import ParentService from '../../services/parent.service';
import SpecService from '../../services/spec.service';

export default class ParentMainPage extends Component {
  state = {
    allForms: [],
    parentForms: [],
    loading: true,
    freeSpaces: 0,
    appStatus: {
      registrationClosed: false,
    },
  };

  componentDidMount = async () => {
    await ParentService.getAllForms().then((response) => {
      const allForms = response.data;
      this.setState({ allForms: allForms });
    });
    await ParentService.getFormsById(this.props.currentUser.id).then(
      (response) => {
        const forms = response.data;
        this.setState({ parentForms: forms });
      }
    );
    await SpecService.freeSpaces().then(
      (response) => {
        this.setState({ freeSpaces: response.data });
      },
      (error) => {
        console.log(error);
      }
    );
    await ParentService.appStatus().then((response) => {
      console.log(response);
      this.setState({ appStatus: response.data });
    });
    this.setState({ loading: false });
  };

  render() {
    const allForms = this.state.allForms;
    const count = allForms.length;
    console.log(this.state.appStatus);
    console.log(this.state.allForms);
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            {!this.state.appStatus.registrationClosed && (
              <Link
                to="/dis-app/addform"
                className="btn btn-success float-right"
              >
                Naujas prašymas
              </Link>
            )}
          </div>
        </div>
        <div className="row">
          <h3 className="text-secondary mb-3 col-8">Mano prašymai</h3>
          <div
            className="alert alert-secondary col mb-5 float-right"
            hidden={!this.state.appStatus.registrationClosed}
          >
            Naujų prašymų pateikimas negalimas
          </div>
        </div>
        {this.state.loading ? (
          <div className="d-flex justify-content-center">
            <div
              className="spinner-border"
              style={{ width: '3rem', height: '3rem', marginTop: '3rem' }}
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <RegisteredForms
            appStatus={this.state.appStatus}
            forms={this.state.parentForms}
          />
        )}
        <div className="text-secondary">
          <h5 className="mt-5 mb-3">
            Pateiktų prašymų į darželius informacija:
          </h5>
          {count !== 0 && (
            <div className="row" style={{ paddingBottom: '5%' }}>
              {!this.state.appStatus.registrationClosed ? (
                <div className="col-5">
                  <p style={{ marginBottom: '2px' }}>
                    Laisvų vietų skaičius: <b>{this.state.freeSpaces}</b>
                  </p>
                </div>
              ) : (
                <div className="col-5">
                  <p style={{ marginBottom: '2px' }}>
                    Užregistruotų vaikų skaičius:{' '}
                    <b className="text-dark">{count}</b>
                  </p>
                  <p style={{ marginBottom: '2px' }}>
                    Laisvų vietų skaičius:{' '}
                    <b className="text-dark">{this.state.freeSpaces}</b>
                  </p>{' '}
                  <p style={{ marginBottom: '2px' }}>
                    Eilėje laukiančių vaikų skaičius:{' '}
                    <b className="text-dark">
                      {
                        allForms.filter((f) => f.formStatus.name === 'EILEJE')
                          .length
                      }
                    </b>
                  </p>
                  <p style={{ marginBottom: '2px' }}>
                    Priimtų vaikų skaičius:{' '}
                    <b className="text-dark">
                      {
                        allForms.filter((f) => f.formStatus.name === 'PRIIMTAS')
                          .length
                      }
                    </b>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
