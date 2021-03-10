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
    pageSize: 9,
    length: 0,
    dateSearchQuery: "",
    timeSearchQuery: "",
    userSearchQuery: "",
    actionSearchQuery: "",
    searchColumn: "Datą",
    sortColumn: { path: "date", order: "asc" },
  };

  handleSearch = (field, query) => {
    this.setState({ [field]: query, currentPage: 1 });
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
      dateSearchQuery,
      timeSearchQuery,
      userSearchQuery,
      actionSearchQuery,
      sortColumn,
    } = this.state;

    let filtered = allLogs;
    if (dateSearchQuery)
      filtered = filtered.filter((log) =>
        log.date.toLowerCase().startsWith(dateSearchQuery.toLowerCase())
      );
    if (timeSearchQuery)
      filtered = filtered.filter((log) =>
        log.time.toLowerCase().startsWith(timeSearchQuery.toLowerCase())
      );
    if (userSearchQuery)
      filtered = filtered.filter((log) =>
        log.user.toLowerCase().startsWith(userSearchQuery.toLowerCase())
      );
    if (actionSearchQuery)
      filtered = filtered.filter((log) =>
        log.action.toLowerCase().includes(actionSearchQuery.toLowerCase())
      );

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
    const {
      searchColumn,
      pageSize,
      currentPage,
      sortColumn,
      dateSearchQuery,
      timeSearchQuery,
      userSearchQuery,
      actionSearchQuery,
    } = this.state;
    const { totalCount, data: logs } = this.getPagedData(allLogs);
    let typeOfSearchField = "text";
    if (searchColumn === "Datą") typeOfSearchField = "date";
    if (searchColumn === "Laiką") typeOfSearchField = "time";

    return (
      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col-6">
              <h2 className="ml-3">Įvykių žurnalas</h2>
            </div>
            <div className="col-6">
              <div className="form-group row">
                <div className="col-3" style={{ paddingRight: "0" }}>
                  <label className="text-right">Data:</label>
                </div>
                <div className="col-9">
                  <SearchBoxForlogs
                    type={"date"}
                    value={dateSearchQuery}
                    onChange={(e) => this.handleSearch("dateSearchQuery", e)}
                  />
                </div>
                <div className="col-3" style={{ paddingRight: "0" }}>
                  <label className="text-right">Laikas:</label>
                </div>
                <div className="col-9">
                  <SearchBoxForlogs
                    type={"time"}
                    value={timeSearchQuery}
                    onChange={(e) => this.handleSearch("timeSearchQuery", e)}
                  />
                </div>
                <div className="col-3" style={{ paddingRight: "0" }}>
                  <label className="text-right">Naudotojas:</label>
                </div>
                <div className="col-9">
                  <SearchBoxForlogs
                    placeholder={" "}
                    type={"text"}
                    value={userSearchQuery}
                    onChange={(e) => this.handleSearch("userSearchQuery", e)}
                  />
                </div>
                <div className="col-3" style={{ paddingRight: "0" }}>
                  <label className="text-right">Veiksmas:</label>
                </div>
                <div className="col-9">
                  <SearchBoxForlogs
                    placeholder={" "}
                    type={"text"}
                    value={actionSearchQuery}
                    onChange={(e) => this.handleSearch("actionSearchQuery", e)}
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
