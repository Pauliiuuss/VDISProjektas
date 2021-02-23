import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Link } from "react-router-dom";
import logo from "../img/logo.png";
import AuthService from '../services/auth.service'

class PasswordReset extends Component {
    state = {
        username: "",
        errorMessage: "",
        message: "",
    }

    onChangeEmail = (e) => {
        this.setState({
          username: e.target.value,
        });
      };
 
      handleForgot = async (e) => {
        e.preventDefault();
            
        if (this.state.username === '') {
            this.setState({
              message: 'Laukai negali būti neužpildyti!',
            });
            return;
          }
      
          await AuthService.reset(this.state.username).then(
            (response) => {
              console.log(response.data.message);
              this.setState({
                message: "Slaptažodis atstatytas į pradinį"
              });
            },
            (error) => {
              const resMessage = "neteisingas vardas!";
      
              this.setState({
                errorMessage: resMessage,
              });
            }
          );
        }

    render() {
    
        return (
          <div className="container col-12 col-sm-12 col-md-6 col-lg-6">
            <div className="row ">
              <div
                className="mx-auto block "
                style={{
                  width: "30rem",
                  marginTop: "5rem",
                  backgroundColor: "#E2E2E2",
                  paddingBottom: "1rem",
                }}
              >
                <img
                  src={logo}
                  alt="logo"
                  className="img-fluid"
                  style={{ width: "30rem" }}
                />
                <Form
                  onSubmit={(e) => this.handleForgot(e)}
                //   ref={(c) => {
                //     this.form = c;
                //   }}
                >
                  <div
                    className="form-group mx-auto mt-3"
                    style={{ width: "11rem" }}
                  >
                    <label htmlFor="email">Slaptažodžio atkūrimas</label>
                    <Input
                    placeholder="Prisijungimo vardas"
                      type="text"
                      className="form-control"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                    />
                  </div>
    
                  <div className="form-group text-center mt-4">
                    <button
                      className="btn btn-secondary"
                      disabled={this.state.loading}
                    >
                      {this.state.loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                      )}
                      <span>Atsiųsti atkūrimą</span>
                    </button>
                  </div>
    
                  <div className="form-group text-center mt-1">
                    <Link to={"/dis-app/"}>Atgal</Link>
                  </div>


                  {this.state.errorMessage && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {this.state.errorMessage}
                  </div>
                </div>
              )}

              {this.state.message && (
                <div className="form-group">
                  <div className="alert alert-success" role="alert">
                    {this.state.message}
                  </div>
                </div>
              )}
{/* 
                  <CheckButton
                    style={{ display: "none" }}
                    ref={(c) => {
                      this.checkBtn = c;
                    }}
                  /> */}
                </Form>
              </div>
            </div>
          </div>
        );
      }
}

export default PasswordReset;