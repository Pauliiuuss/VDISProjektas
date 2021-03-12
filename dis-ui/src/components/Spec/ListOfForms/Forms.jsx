import React, { Component } from 'react';
import FormsTable from './FormsTable';
import { paginate } from '../../utils/paginate';
import Pagination from '../../utils/pagination';
import _ from 'lodash';
import SearchBox from '../../utils/SearchBox';
import SpecService from '../../../services/spec.service';
import ParentService from '../../../services/parent.service';

class Forms extends Component {
  state = {
    forms: [],
    currentPage: 1,
    pageSize: 5,
    length: 0,
    searchQuery: '',
    buttonDisabled: true,
    freeSpaces: 0,
    sortColumn: { path: 'name', order: 'asc' },
    appStatus: {
      registrationClosed: true,
      specelistsDisabled: true,
    },
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  componentDidMount = () => {
    SpecService.freeSpaces().then(
      (response) => {
        this.setState({ freeSpaces: response.data });
      },
      (error) => {
        console.log(error);
      }
    );
    ParentService.appStatus().then((response) => {
      console.log(response);
      this.setState({ appStatus: response.data });
    });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleQueueBuild = () => {
    this.props.handleQueueBuild();
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  getPagedData = (allForms) => {
    const { pageSize, currentPage, searchQuery, sortColumn } = this.state;

    let filtered = allForms;
    if (searchQuery)
      filtered = allForms.filter((m) =>
        m.personId.toString().includes(searchQuery.toString())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const forms = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: forms };
  };

  handleChange = (e) => {
    this.props.handleChange(e);
    if (+e === 0) this.setState({ buttonDisabled: true });
    else this.setState({ buttonDisabled: false });
  };

  handleCancel = () => {
    SpecService.cancelQueue().then(
      (response) => {
        console.log(response);
        window.location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  };

  render() {
    const allForms = this.props.forms;
    const count = allForms ? allForms.length : 0;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    const { totalCount, data: forms } = this.getPagedData(allForms);

    return (
      <div className="container" style={{ marginTop: '20px' }}>
        <div className="row">
          <div className="col">
            {/* <div className="row">
              <div className="col-9">
                <DropdownOfKindergartens handleChange={this.handleChange} />
              </div>
              <div className="col-1">
                <button
                  disabled={this.state.buttonDisabled}
                  onClick={this.handleQueueBuild}
                  className="btn btn-md btn-success"
                >
                  Peržiurėti
                </button>
              </div>
            </div> */}
            {count !== 0 && (
              <div className="row" style={{ paddingBottom: '5%' }}>
                {!this.state.appStatus.registrationClosed ? (
                  <div className="col-5">
                    <p style={{ marginBottom: '2px' }}>
                      Užregistruotų vaikų skaičius: <b>{count}</b>
                    </p>
                    <p style={{ marginBottom: '2px' }}>
                      Laisvų vietų skaičius: <b>{this.state.freeSpaces}</b>
                    </p>
                  </div>
                ) : (
                  <div className="col-5">
                    <p style={{ marginBottom: '2px' }}>
                      Užregistruotų vaikų skaičius: <b>{count}</b>
                    </p>
                    <p style={{ marginBottom: '2px' }}>
                      Laisvų vietų skaičius: <b>{this.state.freeSpaces}</b>
                    </p>{' '}
                    <p style={{ marginBottom: '2px' }}>
                      Panaikintų formų skaičius:{' '}
                      <b>
                        {
                          allForms.filter(
                            (f) => f.formStatus.name === 'PANAIKINTAS'
                          ).length
                        }
                      </b>
                    </p>
                    <p style={{ marginBottom: '2px' }}>
                      Eilėje laukiančių vaikų skaičius:{' '}
                      <b>
                        {
                          allForms.filter((f) => f.formStatus.name === 'EILEJE')
                            .length
                        }
                      </b>
                    </p>
                    <p style={{ marginBottom: '2px' }}>
                      Priimtų vaikų skaičius:{' '}
                      <b>
                        {
                          allForms.filter(
                            (f) => f.formStatus.name === 'PRIIMTAS'
                          ).length
                        }
                      </b>
                    </p>
                  </div>
                )}
              </div>
            )}
            <div className="row">
              <div className="col-4">
                <SearchBox
                  placeholder={'Paieška pagal asmens kodą ...'}
                  value={searchQuery}
                  onChange={this.handleSearch}
                />
              </div>
              <div className="col-4"></div>
              {!this.state.appStatus.specelistsDisabled ? (
                <div className="col-4">
                  {forms.filter((f) => f.formStatus.name === 'PATEIKTAS')
                    .length !== 0 ? (
                    <button
                      onClick={this.props.handleConfirm}
                      className="col-12 btn btn-lg btn-success m-1"
                    >
                      Sudaryti eiles
                    </button>
                  ) : (
                    <button
                      hidden={
                        forms.filter((f) => f.formStatus.name === 'PATEIKTAS')
                          .length !== 0
                      }
                      onClick={this.handleCancel}
                      className="col-12 btn btn-lg btn-secondary m-1"
                    >
                      Atšaukti eiles
                    </button>
                  )}
                </div>
              ) : (
                <div className="alert alert-secondary col">
                  Eilių sudarymas ir atšaukimas negalimas
                </div>
              )}
            </div>
          </div>
        </div>

        <FormsTable
          sortColumn={sortColumn}
          onSort={this.handleSort}
          enableForm={this.props.enableForm}
          cancelForm={this.props.cancelForm}
          loading={this.props.loading}
          forms={forms}
        />
        {forms && !this.props.loading && (
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        )}
      </div>
    );
  }
}

export default Forms;
