import React, { Component } from 'react';
import SpecService from '../../services/spec.service';
import AuthService from '../../services/auth.service';
import Kindergartens from './ListOfKindergardens/Kindergartens';
import Groups from './ListOfGroups/Groups';

class SpecMainPage extends Component {
  state = {
    groups: [],
    selectedKindergarten: 1,
    currentUser: '',
    userReady: false,
    roles: '',
    kindergartens: null,
    message: '',
    successful: false,
    loading: false,
    successfulGroup: false,
    messageGroup: '',
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const currentUser = AuthService.getCurrentUser();
    const { data } = await SpecService.getKindergartens();
    this.setState({ kindergartens: data, loading: false });
    if (data.length > 0) {
      this.setState({ selectedKindergarten: data[0].id });
    }
    if (!currentUser) this.setState({ redirect: '/dis-app/' });
    this.setState({
      currentUser: currentUser,
      userReady: true,
      roles: currentUser.roles,
    });
  }

  handleKindergartenChange = async (id) => {
    this.setState({ selectedKindergarten: id });
    await SpecService.getGroups(id).then((response) => {
      const { data } = response;
      this.setState({ groups: data });
    });
  };

  handleAddKindergarten = async (address, name, capasity) => {
    if (name === "" || address === "") {
      this.setState({
        successful: false,
        message: 'Laukai negali būti neužpildyti!',
      });
      return;
    }

    if (capasity < 1) {
      this.setState({
        successful: false,
        message: 'Vietų skaičius negali buti mažiau kaip 1!',
      });
      return;
    }

    await SpecService.create({ address, name, capasity }).then(
      (response) => {
        console.log(response.data.message);
        this.setState({
          successful: true,
          message: response.data.message,
        });
        SpecService.getKindergartens().then((response) => {
          this.setState({
            kindergartens: response.data,
          });
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
  };

  handleAddGroup = async (name, ageFrom, ageTo, capasity) => {
    console.log('Now', name, ageFrom, ageTo, capasity);

    if (name === '' || ageFrom === '' || ageTo === '' || capasity === '') {
      this.setState({
        successful: false,
        message: 'Laukai negali būti neužpildyti!',
      });
      return;
    }

    if (capasity < 1) {
      this.setState({
        successful: false,
        message: 'Vietų skaičius negali buti mažiau kaip 1!',
      });
      return;
    }

    await SpecService.createGroup(this.state.selectedKindergarten, {
      name,
      capasity,
      ageFrom,
      ageTo,
    }).then(
      (response) => {
        console.log(response.data.message);
        this.setState({
          successfulGroup: true,
          messageGroup: response.data.message,
        });
        SpecService.getGroups(this.state.selectedKindergarten).then(
          (response) => {
            this.setState({
              groups: response.data,
            });
          }
        );
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        this.setState({
          successfulGroup: false,
          messageGroup: resMessage,
        });
      }
    );
  };

  render() {
    return (
      <div className="container">
        {this.state.kindergartens ? (
          <div className="row">
            <div className="col-7">
              <Kindergartens
                active={this.state.selectedKindergarten}
                onKindergartenChange={this.handleKindergartenChange}
                kindergartens={this.state.kindergartens}
                onKindergartenAdd={this.handleAddKindergarten}
                message={this.state.message}
                successful={this.state.successful}
              />
            </div>
            {this.state.kindergartens.length > 0 ? (
              <div className="col-5">
                <Groups
                  groups={this.state.groups}
                  selectedKindergarten={this.state.selectedKindergarten}
                  onAddGroup={this.handleAddGroup}
                  successful={this.state.successfulGroup}
                  message={this.state.messageGroup}
                />
              </div>
            ) : null}
          </div>
        ) : (
          <div className="d-flex justify-content-center">
            <div
              className="spinner-border"
              style={{ width: '3rem', height: '3rem', marginTop: '3rem' }}
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default SpecMainPage;
