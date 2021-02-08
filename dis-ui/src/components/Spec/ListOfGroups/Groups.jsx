import React, { Component } from "react";
import { paginate } from "../../utils/paginate";
import Pagination from "../../utils/pagination";
import _ from "lodash";
import GroupsTable from "./GroupsTable";

class Groups extends Component {
  state = {
    groups: [],
    currentPage: 1,
    pageSize: 6,
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
    const { pageSize, currentPage, sortColumn } = this.state;
    const { totalCount, data: groups } = this.getPagedData(allGroups);

    return (
      <div className="row">
        <div className="col" style={{ textAlign: "center" }}>
          <h4>{this.props.activeName}</h4>
          <p style={{ fontSize: "14px" }}>
            Pasirinktam darželiui yra{" "}
            {groups.length < 2 ? "registruota" : "registruotų"} {groups.length}{" "}
            vaikų {groups.length < 2 ? "grupė" : "grupių"}.
          </p>

          <GroupsTable
            groups={groups}
            sortColumn={sortColumn}
            onSort={this.handleSort}
            onAddGroup={this.props.onAddGroup}
            successful={this.props.successful}
            message={this.props.message}
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

export default Groups;
