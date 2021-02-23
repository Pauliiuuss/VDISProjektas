import React, { Component } from "react";
import FormsTable from "./FormsTable";
import { paginate } from "../../utils/paginate";
import Pagination from "../../utils/pagination";
import _ from "lodash";
import SearchBox from "../../utils/SearchBox";
import DropdownOfKindergartens from "./DropdownOfKindergartens";
import SpecService from "../../../services/spec.service";

class Forms extends Component {
  state = {
    forms: [],
    currentPage: 1,
    pageSize: 5,
    length: 0,
    searchQuery: "",
    buttonDisabled: true,
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
    const { pageSize, currentPage, searchQuery } = this.state;

    let filtered = allForms;
    if (searchQuery)
      filtered = allForms.filter(
        (m) =>
          m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.surename.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const forms = paginate(filtered, currentPage, pageSize);

    return { totalCount: filtered.length, data: forms };
  };

  handleChange = (e) => {
    this.props.handleChange(e);
    if (+e === 0) this.setState({ buttonDisabled: true });
    else this.setState({ buttonDisabled: false });
  };

  handleConfirm = () => {
    if (
      window.confirm(
        "Vaikų registracijų formu statusai bus pakiesti į PRIIMTAS arba EILĖJE negryštamai! Tai gali užtrukti."
      )
    ) {
      console.log("Confirmed");
      SpecService.confirmQueue().then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    } else console.log("Canceled");
  };

  handleCancel = () => {
    SpecService.cancelQueue().then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  render() {
    const allForms = this.props.forms;
    const count = allForms ? allForms.length : 0;
    const { pageSize, currentPage, searchQuery } = this.state;

    const { totalCount, data: forms } = this.getPagedData(allForms);

    return (
      <div className="container" style={{ marginTop: "20px" }}>
        <div className="row">
          <div className="col-6">
            <div className="row">
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
            </div>
            {count !== 0 && (
              <div className="row">
                <button
                  onClick={this.handleConfirm}
                  className="col-5 btn btn-lg btn-success"
                  style={{ marginLeft: "15px" }}
                >
                  Eilės sudarymas
                </button>
                <button
                  onClick={this.handleCancel}
                  className="col-5 btn btn-lg btn-success"
                  style={{ marginLeft: "15px" }}
                >
                  X
                </button>

                <p style={{ fontSize: "1.2rem" }} className="col-5">
                  Viso registruota: <b>{count}</b>
                </p>
              </div>
            )}
          </div>
          <div className="col-6">
            <p>
              Paieška pagal vaiko vardą arba pavardę.
              <br />
              Rodoma {totalCount} pagal paieškos kriterijų.
            </p>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
          </div>
        </div>

        <FormsTable forms={forms} />
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
