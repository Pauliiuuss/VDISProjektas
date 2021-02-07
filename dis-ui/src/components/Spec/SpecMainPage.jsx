import React, { Component } from "react";
import SpecService from "../../services/spec.service";
import AuthService from "../../services/auth.service";
import Kindergartens from "./ListOfKindergardens/Kindergartens";
import Groups from "./ListOfGroups/Groups";

class SpecMainPage extends Component {
  state = {
    groups: [],
    selectedKindergarten: "",
    currentUser: "",
    userReady: false,
    roles: "",
    kindergartens: null,
    message: "",
    successful: false,
    loading: false,
    successfulGroup: false,
    messageGroup: "",
  };

  async componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    const { data } = await SpecService.getKindergartens();
    console.log(data);
    this.setState({ kindergartens: data, selectedKindergarten: data[0].id });

    if (!currentUser) this.setState({ redirect: "/dis-app/" });
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

  handleAddKindergarten = async (address, name, lang, capasity) => {
    this.setState({ loading: false });

    if (name === "" || address === "") {
      this.setState({
        successful: false,
        message: "Laukai negali būti neužpildyti!",
        loading: false,
      });
      return;
    }

    if (capasity < 1) {
      this.setState({
        successful: false,
        message: "Vietų skaičius negali buti mažiau kaip 1!",
        loading: false,
      });
      return;
    }

    await SpecService.create({ address, name, lang, capasity }).then(
      (response) => {
        console.log(response.data.message);
        this.setState({
          successful: true,
          message: response.data.message,
          loading: false,
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
          loading: false,
        });
      }
    );
  };

  handleAddGroup = async (name, ageFrom, ageTo, capasity) => {
    console.log("Now", name, ageFrom, ageTo, capasity);
    this.setState({ loading: false });

    if (name === "" || ageFrom === "" || ageTo === "" || capasity === "") {
      this.setState({
        successful: false,
        message: "Laukai negali būti neužpildyti!",
        loading: false,
      });
      return;
    }

    if (capasity < 1) {
      this.setState({
        successful: false,
        message: "Vietų skaičius negali buti mažiau kaip 1!",
        loading: false,
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
          loading: false,
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
          loading: false,
        });
      }
    );
  };

  render() {
    return (
      <div className="container">
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
          {this.state.kindergartens ? (
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
      </div>
    );
  }
}

export default SpecMainPage;
