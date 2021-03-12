import React, { Component } from 'react';
import AuthService from '../../services/auth.service';
import Navbar from '../../components/navbar.component';
import Chart from './Chart';

export default class Statistic extends Component {
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
    if (this.state.roles.includes('ROLE_SPEC'))
      return (
        <React.Fragment>
          <Navbar />
          <Chart />
        </React.Fragment>
      );
    if (this.state.roles.includes('ROLE_PARENT'))
      return (
        <React.Fragment>
          <Navbar />
          <Chart currentUser={this.state.currentUser} />
        </React.Fragment>
      );
    return '';
  }
}
