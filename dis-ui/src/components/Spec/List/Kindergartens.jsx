import React, { Component } from "react";
import KindergartenTable from "./KindergartenTable";
import { paginate } from "../../utils/paginate";
import Pagination from "../../utils/pagination";
import AdminService from "../../../services/admin.service";
import SearchBox from "./SearchBox";
import _ from "lodash";
import SpecService from "../../../services/spec.service";

class Kindergartens extends Component {
  state = {
    kindergartens: [],
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

  getPagedData = (allKindergertens) => {
    const { pageSize, currentPage, searchQuery, sortColumn } = this.state;

    let filtered = allKindergertens;
    if (searchQuery)
      filtered = allKindergertens.filter((m) =>
        m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    // return { totalCount: filtered.length, data: movies };
    return { totalCount: 1, data: movies };
  };

  render() {
    const allKindergartens = this.props.kindergartens;
    // const count = allKindergartens.length;
    const count = 1;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (count === 0)
      return (
        <p className="m-4 mx-auto" style={{ width: "290px" }}>
          Duomenų bazėje vaikų darželių nėra registruota.
        </p>
      );

    const { totalCount, data: kindergartens } = this.getPagedData(
      allKindergartens
    );

    return (
      <div className="row">
        <div className="col">
          <button className="btn btn-success">Prdėti</button>
          <p>
            Duomenų bazėje {kindergartens.length} registruotų vaikų darželių.
            Rodomi {totalCount} pagal paieškos kriterijų.
          </p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />

          <KindergartenTable
            kindergartens={kindergartens}
            sortColumn={sortColumn}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={kindergartens.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Kindergartens;
