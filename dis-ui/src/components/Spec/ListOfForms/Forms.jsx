import React, { Component } from "react";
import FormsTable from "./FormsTable";
import { paginate } from "../../utils/paginate";
import Pagination from "../../utils/pagination";
import _ from "lodash";
import SearchBox from "../../utils/SearchBox";
import DropdownOfKindergartens from "./DropdownOfKindergartens";

class Forms extends Component {
  state = {
    forms: [],
    currentPage: 1,
    pageSize: 5,
    length: 0,
    searchQuery: "",
    sortColumn: { path: "id", order: "asc" },
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

  getPagedData = (allForms) => {
    const { pageSize, currentPage, searchQuery, sortColumn } = this.state;

    let filtered = allForms;
    if (searchQuery)
      filtered = allForms.filter((m) =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const forms = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: forms };
  };

  render() {
    const { handleChange } = this.props;
    const allForms = this.props.forms;
    const count = allForms ? allForms.length : 0;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    const { totalCount, data: forms } = this.getPagedData(allForms);

    return (
      <div className="row" style={{ marginTop: "20px" }}>
        <div className="row">
          <div className="col-6">
            <DropdownOfKindergartens handleChange={handleChange} />
          </div>
          <div className="col-6">
            <p>
              Pasirinktas vaikų darželis turi {count} registruotų vaikų formas.
              Rodoma {totalCount} pagal paieškos kriterijų.
            </p>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
          </div>
        </div>

        <FormsTable
          forms={forms}
          sortColumn={sortColumn}
          onSort={this.handleSort}
        />
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

export default Forms;
