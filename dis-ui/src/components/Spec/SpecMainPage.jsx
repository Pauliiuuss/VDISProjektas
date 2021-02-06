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
  };

  async componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    const { data } = await SpecService.getKindergartens();
    this.setState({ kindergartens: data });

    if (!currentUser) this.setState({ redirect: "/dis-app/" });
    this.setState({
      currentUser: currentUser,
      userReady: true,
      roles: currentUser.roles,
    });
  }

  handleKindergartenChange = async (id) => {
    await SpecService.getGroups(id).then((response) => {
      const { data } = response;
      this.setState({ groups: data });
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-7">
            <Kindergartens
              onKindergartenChange={this.handleKindergartenChange}
              kindergartens={this.state.kindergartens}
            />
          </div>
          <div className="col-5">
            <Groups
              groups={this.state.groups}
              selectedKindergarten={this.state.selectedKindergarten}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SpecMainPage;
