import React, { Component } from "react";
import RegisteredFormsTable from "./RegisteredFormsTable";

export default class Forms extends Component {
  state = {
    forms: [],
  };

  //   componentDidMount = async () => {
  //     const { data } = await ParentService.getFormsById();
  //     this.setState({ users: data });
  //   };

  // componentDidMount() {
  //   const currentUser = AuthService.getCurrentUser();
  //   ParentService.getAllForms()
  //     .then((result) => {
  //       this.setState({ forms: result.data });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   if (!currentUser) this.setState({ redirect: '/dis-app/' });
  //   this.setState({
  //     currentUser: currentUser,
  //     userReady: true,
  //     roles: currentUser.roles,
  //   });
  // }

  render() {
    const allForms = this.props.forms;
    const count = allForms.length;

    if (count === 0)
      return (
        <div
          className="alert alert-secondary text-center d-grid gap-2 col-6 mx-auto"
          role="alert"
        >
          Pateiktų prašymų nėra registruota.
        </div>
      );

    return (
      <div className="row">
        <div className="col">
          <RegisteredFormsTable forms={allForms} />
        </div>
      </div>
    );
  }
}
