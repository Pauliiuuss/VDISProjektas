import React, { Component } from 'react';
import AuthService from '../services/auth.service';
import AdminMainPage from './Admin/AdminMainPage';
import SpecMainPage from './Spec/SpecMainPage';
import ParentMainPage from './Parent/ParentMainPage';
import Navbar from './navbar.component';

class MainAfterLogin extends Component {
  state = {
    redirect: null,
    userReady: false,
    currentUser: { username: '' },
    roles: [],
  };

  async componentDidMount() {
    const currentUser = await AuthService.getCurrentUser();

    if (!currentUser) {
      this.props.history.push('/dis-app/');
      window.location.reload();
    } else
      this.setState({
        currentUser: currentUser,
        userReady: true,
        roles: currentUser.roles,
      });
  }

  render() {
    if (this.state.roles.indexOf('ROLE_SPEC') > -1)
      return (
        <React.Fragment>
          <Navbar />
          <SpecMainPage />
        </React.Fragment>
      );
    if (this.state.roles.indexOf('ROLE_PARENT') > -1)
      return (
        <React.Fragment>
          <Navbar />
          <ParentMainPage />
        </React.Fragment>
      );
    return (
      <React.Fragment>
        <Navbar />
        <AdminMainPage />
      </React.Fragment>
    );
  }
}

export default MainAfterLogin;
