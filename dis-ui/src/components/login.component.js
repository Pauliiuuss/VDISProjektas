import React, { Component } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import logo from '../img/logo.png';

import AuthService from '../services/auth.service';

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Privalomi laukai turi būti užpildyti!
      </div>
    );
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: '',
      password: '',
      loading: false,
      message: '',
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: '',
      loading: true,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.history.push("/dis-app/home");
          window.location.reload();
        },
        (error) => {
          const resMessage = 'Neteisingi prisijungimo vardas ar slaptažodis!';

          this.setState({
            loading: false,
            message: resMessage,
          });
        }
      );
    } else {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    return (
      <div className="container">
        <div
          className="mx-auto"
          style={{
            width: '30rem',
            marginTop: '5rem',
            backgroundColor: '#E2E2E2',
            paddingBottom: '1rem',
          }}
        >
          <img src={logo} alt="logo" style={{ width: '30rem' }} />
          <Form
            onSubmit={this.handleLogin}
            ref={(c) => {
              this.form = c;
            }}
          >
            <div className="form-group mx-auto mt-3" style={{ width: '10rem' }}>
              <label htmlFor="username">Vartotojo vardas</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
                validations={[required]}
              />
            </div>

            <div className="form-group mx-auto" style={{ width: '10rem' }}>
              <label htmlFor="password">Slaptažodis</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
              />
            </div>

            <div className="form-group text-center mt-5">
              <button
                className="btn btn-secondary"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Prisijungti</span>
              </button>
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
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
      </div>
      // <div className="col-md-12">
      //   <div className="card card-container">
      //     <img
      //       src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
      //       alt="profile-img"
      //       className="profile-img-card"
      //     />

      //     <Form
      //       onSubmit={this.handleLogin}
      //       ref={(c) => {
      //         this.form = c;
      //       }}
      //     >
      //       <div className="form-group">
      //         <label htmlFor="username">Username</label>
      //         <Input
      //           type="text"
      //           className="form-control"
      //           name="username"
      //           value={this.state.username}
      //           onChange={this.onChangeUsername}
      //           validations={[required]}
      //         />
      //       </div>

      //       <div className="form-group">
      //         <label htmlFor="password">Password</label>
      //         <Input
      //           type="password"
      //           className="form-control"
      //           name="password"
      //           value={this.state.password}
      //           onChange={this.onChangePassword}
      //           validations={[required]}
      //         />
      //       </div>

      //       <div className="form-group">
      //         <button
      //           className="btn btn-primary btn-block"
      //           disabled={this.state.loading}
      //         >
      //           {this.state.loading && (
      //             <span className="spinner-border spinner-border-sm"></span>
      //           )}
      //           <span>Login</span>
      //         </button>
      //       </div>

      //       {this.state.message && (
      //         <div className="form-group">
      //           <div className="alert alert-danger" role="alert">
      //             {this.state.message}
      //           </div>
      //         </div>
      //       )}
      //       <CheckButton
      //         style={{ display: 'none' }}
      //         ref={(c) => {
      //           this.checkBtn = c;
      //         }}
      //       />
      //     </Form>
      //   </div>
      // </div>
    );
  }
}
