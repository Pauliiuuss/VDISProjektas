import React, { Component } from 'react';
import AdminService from '../../services/admin.service';
import AuthService from '../../services/auth.service';
import Navbar from '../navbar.component';
import Logs from './LogList/Logs';

class Logging extends Component {
  state = {
    log: [],
    loading: true,
  };

  async componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser || !currentUser.roles.includes('ROLE_ADMIN')) {
      this.props.history.push('/dis-app/');
      window.location.reload();
    }
    this.setState({
      currentUser: currentUser,
      userReady: true,
      roles: currentUser.roles,
    });
    console.log(
      AdminService.getLog().then(
        (response) => {
          this.setState({ log: response.data, loading: false });
        },
        (error) => {
          console.log(error);
          this.setState({ loading: false });
        }
      )
    );
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className="container">
          <div className="table">
            <Logs loading={this.state.loading} logs={this.state.log} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Logging;
