import React, { Component } from 'react';
import UsersTable from './UsersTable';
import { paginate } from '../../utils/paginate';
import Pagination from '../../utils/pagination';
import AdminService from '../../../services/admin.service';

class Users extends Component {
  state = {
    users: [],
    currentPage: 1,
    pageSize: 5,
    length: 0,
  };

  async componentDidMount() {
    const { data } = await AdminService.getUsers();
    this.setState({ users: data });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  getPagedData = () => {
    const { pageSize, currentPage, users } = this.state;

    const paginatedUsers = paginate(users, currentPage, pageSize);

    return { totalCount: users.length, data: paginatedUsers };
  };

  render() {
    const { length: count } = this.state.users;
    const { pageSize, currentPage } = this.state;

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
          <p className="m-4 mx-auto" style={{ width: '320px' }}>
            Duomenų bazėje {totalCount} registruotų naudotojų.
          </p>
          <UsersTable users={users} />
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
