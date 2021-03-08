import React, { Component } from "react";
import UsersTable from "./UsersTable";
import { paginate } from "../../utils/paginate";
import Pagination from "../../utils/pagination";
import AdminService from "../../../services/admin.service";
import _ from "lodash";
import SearchBox from "../../utils/SearchBox";
import swal from "sweetalert";

class Users extends Component {
  state = {
    users: [],
    currentPage: 1,
    pageSize: 5,
    length: 0,
    searchQuery: "",
    sortColumn: { path: "username", order: "asc" },
  };

  componentDidMount = async () => {
    const { data } = await AdminService.getUsers();
    this.setState({ users: data });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleDelete = async (user) => {
    const originalUsers = this.state.users;
    const users = originalUsers.filter((u) => u.id !== user.id);
    this.setState({ users });

    await AdminService.deleteUser(user.id).then(
      (response) => {
        +response.status < 400 &&
          swal({
            title: "Naudotojas ištrintas",
            icon: "success",
            buttons: {
              confirm: { text: "Uždaryti", className: "sweet-confirm" },
            },
          }).then(function () {
            window.location.reload();
          });
      },
      (error) => {
        this.setState({ users: originalUsers });
        +error.response.status > 400 &&
          swal({
            title: "Ivyko klaida",
            icon: "warning",
            button: "Uždaryti",
            dangerMode: true,
          });
      }
    );
  };

  handleDisable = async (user) => {
    console.log("Disable: " + user);
  };

  handleResetPassword = async (user) => {
    await AdminService.resetPassword({ username: user.username }).then(
      (response) => {
        +response.status < 400 &&
          swal({
            title: "Slaptažodis sėkmingai atstatytas",
            icon: "success",
            buttons: {
              confirm: { text: "Uždaryti", className: "sweet-confirm" },
            },
          });
        // alert("Slaptažodis sėkmingai atstatytas");
      },
      (error) => {
        console.log(error);
        +error.response.status > 400 &&
          swal({
            title: "Ivyko klaida",
            icon: "warning",
            button: "Uždaryti",
            dangerMode: true,
          });
      }
    );
  };

  getPagedData = (allUsers) => {
    const { pageSize, currentPage, searchQuery, sortColumn } = this.state;

    let filtered = allUsers;
    if (searchQuery)
      filtered = allUsers.filter((m) =>
        m.username.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const users = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: users };
  };

  render() {
    const allUsers = this.props.users;
    const count = allUsers.length;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (count === 0)
      return (
        <p className="m-4 mx-auto" style={{ width: "290px" }}>
          Duomenų bazėje naudotojų nėra registruota.
        </p>
      );

    const { totalCount, data: users } = this.getPagedData(allUsers);

    return (
      <div className="row">
        <div className="col">
          <p>
            Duomenų bazėje {allUsers.length} registruotų naudotojų. Rodomi{" "}
            {totalCount} pagal paieškos kriterijų.
          </p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />

          <UsersTable
            users={users}
            sortColumn={sortColumn}
            onSort={this.handleSort}
            onDelete={this.handleDelete}
            onDisable={this.handleDisable}
            onResetPassword={this.handleResetPassword}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Users;
