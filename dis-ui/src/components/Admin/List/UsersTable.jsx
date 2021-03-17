import React, { Component } from "react";
import Table from "./Table";
import Dialog from "react-bootstrap-dialog";
import ReactTooltip from "react-tooltip";

class UsersTable extends Component {
  columns = [
    {
      path: "username",
      label: "Prisijungimo vardas",
    },
    { path: "role", label: "Rolė" },
    { path: "button", label: "" },
    {
      key: "delete",
      content: (user) => (
        <button
          data-tip="Ištrinti"
          onClick={() => {
            this.dialog.show({
              body: `Ištrinti naudotoją: ${user.username}`,
              actions: [
                Dialog.CancelAction(),
                Dialog.OKAction(() => {
                  this.props.onDelete(user);
                }),
              ],
            });
          }}
          className="btn btn-danger btn-sm"
        >
          <i className="fa fa-trash-o" aria-hidden="true"></i>
        </button>
      ),
    },
    {
      key: "disable",
      content: (user) => (
        <button
          hidden={true}
          data-tip="Deaktyvuoti"
          onClick={() => {
            this.dialog.show({
              body: `Deaktyvuoti naudotoją: ${user.username}`,
              actions: [
                Dialog.CancelAction(),
                Dialog.OKAction(() => {
                  this.props.onDisable(user);
                }),
              ],
            });
          }}
          className="btn btn-warning btn-sm"
        >
          <i className="fa fa-lock" aria-hidden="true"></i>
        </button>
      ),
    },
    {
      key: "reset",
      content: (user) => (
        <button
          data-tip="Atstatyti slaptažodį"
          onClick={() => {
            this.dialog.show({
              body: `Atstatyti slaptažodį naudotojui: ${user.username}`,
              actions: [
                Dialog.CancelAction(),
                Dialog.OKAction(() => {
                  this.props.onResetPassword(user);
                }),
              ],
            });
          }}
          className="btn btn-success btn-sm"
        >
          <i className="fa fa-key" aria-hidden="true"></i>
        </button>
      ),
    },
  ];
  onResetPassword;
  render() {
    Dialog.setOptions({
      defaultOkLabel: "Patvirtinti",
      defaultCancelLabel: "Atšaukti",
      primaryClassName: "btn-success",
      defaultButtonClassName: "btn-danger",
    });

    const { users, onSort, sortColumn } = this.props;
    return (
      <React.Fragment>
        <ReactTooltip />
        <Dialog
          ref={(el) => {
            this.dialog = el;
          }}
        />
        <Table
          columns={this.columns}
          data={users}
          sortColumn={sortColumn}
          onSort={onSort}
        />
      </React.Fragment>
    );
  }
}

export default UsersTable;
