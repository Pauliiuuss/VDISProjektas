import React, { Component } from "react";
import LogsTable from "./LogsTable";
import _ from "lodash";
import { paginate } from "../../utils/paginate";
import SearchBoxForlogs from "../../utils/SearchBoxForLogs";
import Pagination from "../../utils/pagination";

export default class Logs extends Component {
  state = {
    logs: [],
    currentPage: 1,
    pageSize: 15,
    length: 0,
    searchQuery: "",
    searchColumn: "Data",
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
    const {
      pageSize,
      currentPage,
      searchQuery,
      sortColumn,
      searchColumn,
    } = this.state;

    let filtered = allLogs;
    if (searchQuery) {
      if (searchColumn === "Data")
        filtered = allLogs.filter((log) =>
          log.date.toLowerCase().startsWith(searchQuery.toLowerCase())
        );
      if (searchColumn === "Laikas")
        filtered = allLogs.filter((log) =>
          log.time.toLowerCase().startsWith(searchQuery.toLowerCase())
        );
      if (searchColumn === "Naudotojas")
        filtered = allLogs.filter((log) =>
          log.user.toLowerCase().startsWith(searchQuery.toLowerCase())
        );
      if (searchColumn === "Veiksmas")
        filtered = allLogs.filter((log) =>
          log.action.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const users = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: users };
  };

  handleSelectChange = (e) => {
    const searchColumn = e.target.value;
    console.log(searchColumn);
    this.setState({ searchColumn, searchQuery: "" });
  };

  render() {
    const allLogs = this.props.logs;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { totalCount, data: logs } = this.getPagedData(allLogs);

    return (
      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col-6"></div>
            <div className="col-6">
              <div class="form-group row">
                <div className="col-3" style={{ paddingRight: "0" }}>
                  <label>Paieška pagal:</label>
                </div>
                <div className="col">
                  <select
                    class="form-control"
                    value={this.state.searchColumn}
                    onChange={this.handleSelectChange}
                  >
                    <option>Data</option>
                    <option>Laikas</option>
                    <option>Naudotojas</option>
                    <option>Veiksmas</option>
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <div className="col-4" style={{ paddingRight: "0" }}>
                  <label>Paieškos tekstas:</label>
                </div>
                <div className="col" style={{ paddingLeft: "0" }}>
                  <SearchBoxForlogs
                    placeholder={"..."}
                    value={searchQuery}
                    onChange={this.handleSearch}
                  />
                </div>
              </div>
            </div>
          </div>

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
