import React, { Component } from 'react';
import Navbar from '../../navbar.component';
import UploadService from '../../../services/upload-files.service';
import DocumentsTable from './DocumentsTable';
import { paginate } from '../../utils/paginate';
import Pagination from '../../utils/pagination';
import _ from 'lodash';
import SearchBox from '../../utils/SearchBox';

export default class DocumentsList extends Component {
  state = {
    docs: [],
    currentPage: 1,
    pageSize: 5,
    length: 0,
    searchQuery: '',
    sortColumn: { path: 'userName', order: 'asc' },
  };

  componentDidMount = async () => {
    const { data } = await UploadService.getFiles();
    this.setState({ docs: data });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = (allDocs) => {
    const { pageSize, currentPage, searchQuery, sortColumn } = this.state;

    let filtered = allDocs;
    if (searchQuery)
      filtered = allDocs.filter((d) =>
        d.userName.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const documents = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: documents };
  };

  render() {
    const allDocs = this.state.docs;

    const { pageSize, currentPage, searchQuery } = this.state;

    const { totalCount, data: documents } = this.getPagedData(allDocs);

    return (
      <React.Fragment>
        <Navbar />
        <div className="container mt-5 text-secondary">
          <div className="mb-4 col-lg-4">
            <h3 className="mb-4">Įkelti dokumentai sistemoje</h3>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
          </div>
          <DocumentsTable docs={documents} />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </React.Fragment>
    );
  }
}
