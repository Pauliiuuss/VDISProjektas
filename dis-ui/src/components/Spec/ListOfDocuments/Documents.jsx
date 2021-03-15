import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from '../../navbar.component';
import AuthService from '../../../services/auth.service';
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
    roles: '',
    redirect: null,
    currentUser: '',
    sortColumn: { path: 'userName', order: 'asc' },
  };

  componentDidMount = async () => {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: '/dis-app/' });
    this.setState({
      currentUser: currentUser,
      roles: currentUser.roles,
    });
    if (!currentUser.roles.includes('ROLE_SPEC')) {
      this.props.history.push('/dis-app/');
      window.location.reload();
    }
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
    if (this.state.redirect) return <Redirect to={this.state.redirect} />;

    const allDocs = this.state.docs;
    const count = allDocs.length;
    if (count === 0)
      return (
        <React.Fragment>
          <Navbar />
          <h3 className="my-4 text-secondary text-center">
            Įkelti dokumentai sistemoje
          </h3>
          <div
            className="alert alert-secondary text-center d-grid gap-2 col-6 mx-auto"
            role="alert"
          >
            Įkeltų dokumentų sistemoje nėra.
          </div>
        </React.Fragment>
      );

    const { pageSize, currentPage, searchQuery } = this.state;

    const { totalCount, data: documents } = this.getPagedData(allDocs);

    return (
      <React.Fragment>
        <Navbar />
        <div className="container text-secondary mt-5">
          <div className="row">
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
        </div>
      </React.Fragment>
    );
  }
}
