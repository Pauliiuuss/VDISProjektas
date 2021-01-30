import React, { Component } from "react";
import UsersTable from "./UsersTable";
import { paginate } from "../../utils/paginate";
import Pagination from "../../utils/pagination";
import AdminService from "../../../services/admin.service";
import SearchBox from "./SearchBox";
import { toast } from "react-toastify";
import _ from "lodash";

class Users extends Component {
  state = {
    users: [],
    currentPage: 1,
    pageSize: 5,
    length: 0,
    searchQuery: "",
    sortColumn: { path: "username", order: "asc" },
  };

  async componentDidMount() {
    const { data } = await AdminService.getUsers();
    this.setState({ users: data });
  }

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
        +response.status < 400 && alert("Naudotojas ištrintas");
      },
      (error) => {
        this.setState({ users: originalUsers });
        +error.response.status > 400 && alert("Ivyko klaida");
      }
    );
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      users: allUsers,
      searchQuery,
      sortColumn,
    } = this.state;

    let filtered = allUsers;
    if (searchQuery)
      filtered = allUsers.filter((m) =>
        m.username.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.users;
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      users: allUsers,
    } = this.state;

    if (count === 0)
      return (
        <p className="m-4 mx-auto" style={{ width: '290px' }}>
          Duomenų bazėje naudotojų nėra registruota.
        </p>
      );

    const { totalCount, data: users } = this.getPagedData();

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
