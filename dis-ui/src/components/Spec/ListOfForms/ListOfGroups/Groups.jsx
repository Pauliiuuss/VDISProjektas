import React, { Component } from "react";
import GroupsTable from "./GroupsTable";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../../utils/pagination";
import _ from "lodash";
import Forms from "../Forms";

class Groups extends Component {
  state = {
    forms: [],
    currentPage: 1,
    pageSize: 5,
    length: 0,
    searchQuery: "",
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  getPagedData = (allForms) => {
    const { pageSize, currentPage } = this.state;

    let filtered = allForms;

    const forms = paginate(filtered, currentPage, pageSize);

    if (filtered) return { totalCount: filtered.length, data: forms };
    else return { totalCount: 0, data: forms };
  };

  render() {
    const allForms = this.props.forms;
    const count = allForms ? allForms.length : 0;
    const { pageSize, currentPage } = this.state;
    const { group } = this.props;

    const { totalCount, data: forms } = this.getPagedData(allForms);

    if (group && group.name === "Laukiantys") {
      return null;
    }

    return (
      <div className="row m-2" style={{ paddingBottom: "100px" }}>
        {group !== null ? (
          <p className="m-2">
            <b>{group.name}</b> amžiaus grupė nuo {group.age} turi{" "}
            {group.capasity} lasivas vietas. Po eilių sudarimo bus{" "}
            {totalCount === 1 ? "užimta" : "užimtos"} {totalCount}{" "}
            {totalCount === 1 ? "vieta" : "vietos"}.
          </p>
        ) : (
          <p className="m-2">
            <b>Laukiantys eilėje.</b>
          </p>
        )}

        <GroupsTable forms={forms} />
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default Groups;
