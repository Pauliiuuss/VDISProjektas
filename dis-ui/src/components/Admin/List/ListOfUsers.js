import React, { Component } from "react";
import Pagination from "../../utils/pagination";

class ListOfUsers extends Component {
  state = {
    itemsCount: 0,
    pageSize: 10,
    currentPage: 1,
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  state = {};
  render() {
    const { totalCount, pageSize, currentPage } = this.state;
    return (
      <div>
        <h5 className="text-center mt-5">Naudotojų sąrašas</h5>
        <table className="table col-6 mt-3 mx-auto">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Prisijungimo vardas</th>
              <th scope="col">Rolė</th>
            </tr>
          </thead>
          <div className="m-3">
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </table>
      </div>
    );
  }
}

export default ListOfUsers;
