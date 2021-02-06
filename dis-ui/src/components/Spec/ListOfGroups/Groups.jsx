import React, { Component } from "react";
import { paginate } from "../../utils/paginate";
import Pagination from "../../utils/pagination";
import _ from "lodash";
import GroupsTable from "./GroupsTable";

class Groups extends Component {
  state = {
    groups: [],
    currentPage: 1,
    pageSize: 5,
    length: 0,
    searchQuery: "",
    sortColumn: { path: "name", order: "asc" },
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

  getPagedData = (allGroups) => {
    const { pageSize, currentPage, searchQuery, sortColumn } = this.state;

    let filtered = allGroups;
    if (searchQuery)
      filtered = allGroups.filter((m) =>
        m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const allGroups = this.props.groups;
    const count = allGroups ? allGroups.length : 0;
    const { pageSize, currentPage, sortColumn } = this.state;

    if (count === 0)
      return (
        <p className="m-4 mx-auto" style={{ width: "290px" }}>
          Pasirinktam darželiui grupių nėra registruota.
        </p>
      );

    const { data: groups } = this.getPagedData(allGroups);

    return (
      <div className="row">
        <div className="col">
          <p style={{ fontSize: "14px" }}>
            Pasirinktam darželiui yra{" "}
            {groups.length < 2 ? "registruota" : "registruotų"} {groups.length}{" "}
            vaikų {groups.length < 2 ? "grupė" : "grupių"}.
          </p>

          <GroupsTable
            groups={groups}
            sortColumn={sortColumn}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={groups.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Groups;
