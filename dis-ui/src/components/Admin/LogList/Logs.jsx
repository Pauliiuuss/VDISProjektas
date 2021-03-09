import React, { Component } from "react";
import LogsTable from "./LogsTable";
import _ from "lodash";
import { paginate } from "../../utils/paginate";
import SearchBox from "../../utils/SearchBox";
import Pagination from "../../utils/pagination";

export default class Logs extends Component {
  state = {
    logs: [],
    currentPage: 1,
    pageSize: 15,
    length: 0,
    searchQuery: "",
    sortColumn: { path: "data", order: "asc" },
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

  getPagedData = (allLogs) => {
    const { pageSize, currentPage, searchQuery, sortColumn } = this.state;

    let filtered = allLogs;
    if (searchQuery)
      filtered = allLogs.filter((log) =>
        log.date.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const users = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: users };
  };

  render() {
    const allLogs = this.props.logs;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { totalCount, data: logs } = this.getPagedData(allLogs);

    return (
      <div className="row">
        <div className="col">
          <SearchBox value={searchQuery} onChange={this.handleSearch} />

          <LogsTable
            logs={logs}
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
