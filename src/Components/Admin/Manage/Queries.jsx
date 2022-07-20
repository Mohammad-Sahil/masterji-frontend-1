import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import SearchBar from "./searchBar";
import Metadata from '../../Metadata';
import "./table.css";
class Queries extends Component {
  state = {
    queries: [],
    showModal: false,
    modalFields: {
      operation: "Create",
      query: {},
    },
    searchText: ""
  };
y
  api_url = "https://us-central1-masterji-online.cloudfunctions.net/app/";

  componentDidMount() {
    fetch(this.api_url+"query/v2/get")
      .then((response) => response.json())
      .then((queries) => {
        console.log(queries);
        this.setState({ queries });
      });
  }

  handleModal(query, operation) {
    this.setState({ showModal: !this.state.showModal });
    let modalFields = {
      operation,
      query,
    };
    this.setState({ modalFields });
  }

  handleChange = (e) => {
    let modalFields = this.state.modalFields;
    modalFields.query[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ modalFields });
  };

  handleCreate = (e) => {
    e.preventDefault();
    const query = this.state.modalFields.query;
    fetch(this.api_url + "query/v2/post", {
        method:"POST",
        body:JSON.stringify({...query}),
        headers:{"Content-Type" : "application/json"}
    })
    .then(response => response.json())
    .then((data) => {
        console.log(data);
        const queries = [data.data, ...this.state.queries];
        this.setState({ queries, showModal:false  });
    })
    .catch(err => console.log(err));
  };

  handleUpdate = (e) => {
    e.preventDefault();
    const query = this.state.modalFields.query;
    console.log(query)
      fetch(this.api_url + "query/v2/put/" + query.id, {
          method:"PUT",
          body:JSON.stringify({...query}),
          headers:{"Content-Type" : "application/json"}
      })
      .then(response => {
        console.log(response);
        response.json();
      })
      .then((data) => {
        console.log(data);
        const queries = [...this.state.queries];
        const index = queries.indexOf(query);
        queries[index] = { ...data.data };
        this.setState({ queries, showModal:false });
      })
      .catch(err => console.log("err" + err))
  };

  handleDelete = (query) => {

    fetch(this.api_url + "query/v2/delete/" + query.id,{
            method:"DELETE"
        })
        .then(response => response.json())
        .then((data)=>{
            console.log(data);
            const queries = this.state.queries.filter(
              (c) => c.id !== query.id
            );
            this.setState({ queries });
        })
        .catch(err => console.log(err));
   
  };

  search = (searchText) => {
    console.log(searchText);
    this.setState({ searchText });
  };

  render() {
    const { queries, searchText } = this.state;
    const modalQuery = this.state.modalFields.query;
    let filteredQueries = queries;
    filteredQueries = filteredQueries.filter((query) => {
      for (let property in query) {
        if (typeof query[property] === 'string' && query[property].toLowerCase().includes(searchText.toLowerCase())) return true;
      }
      return false;
    });
    return (
      <>
      <Metadata title='Queries | Admin | Masterji'/>
      <div>
          <div style={{ margin:'20px 20px 20px 30px', padding:'20px', borderRadius: '5px', backgroundColor: 'white'}}>
            <div className="row">
              <div className="col-2">
                <button
                  type="button"
                  className="btn btn-warning addButton"
                  style={{ width: '100%', color:'white' }}
                  onClick={() => this.handleModal({}, "Create")}
                >
                  Add
                </button>
              </div>
              <div className="col-10">
                <SearchBar search={this.search} searchInput={searchText} />
              </div>
            </div>
            <br />
            <div class="table-responsive tableDiv">
              <table className="table table-condensed">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Email</th>
                    <th scope="col">Message</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Updated at</th>
                    <th scope="col"><center>Resolved</center></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQueries.map((query) => (
                    <tr key={query.id}>
                      <td>{query.email}</td>
                      <td>{query.message}</td>
                      <td>{query.date}</td>
                      <td>{query.updatedAt}</td>
                      <td align="center">{query.resolved?<i style={{color:'green', fontSize:'20px'}} class="fa fa-square" aria-hidden="true"></i>:<i style={{color:'red', fontSize:'20px'}}  class="fa fa-square fa-2x" aria-hidden="true"></i>}</td>
                      <td>
                        <button className="btn-warning editButton" onClick={() =>this.handleModal(query, "Update")}>
                          <i class="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                      </td>
                      <td>
                        <button className="btn-danger deleteButton" onClick={() => this.handleDelete(query)}>
                          <i class="fa fa-trash-o"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal show={this.state.showModal}>
              <Modal.Header>
                {this.state.modalFields.operation} Query
              </Modal.Header>
              <Modal.Body>
                <form
                  onSubmit={
                    this.state.modalFields.operation === "Update"
                      ? this.handleUpdate
                      : this.handleCreate
                  }
                >
                  <div className="form-group">
                    <label>Email</label>
                    <input type="text" defaultValue={modalQuery.email} name="email" className="form-control" id="emailModal" onChange={this.handleChange} placeholder="Enter Email"/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Message</label>
                    <input type="text" defaultValue={modalQuery.message} name="message" className="form-control" id="messageModal" onChange={this.handleChange} placeholder="Enter Message"/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Resolved</label>
                    <select value={modalQuery.resolved } class="form-select" aria-label="Default select example"  name="resolved" id="resolvedModal" onChange={this.handleChange} placeholder="Resolved/Pending">
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </select>
                    {/* <input type="text" defaultValue={modalQuery.resolved} name="resolved" className="form-control" id="resolvedModal" onChange={this.handleChange} placeholder="Resolved/Pending"/> */}
                  </div>
                  <br />
                  <div style={{ float: "right" }}>
                    <span>
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </span>
                    <span>
                      <button type="button" className="btn btn-primary" onClick={() => this.setState({ showModal: false })}>
                        Close
                      </button>
                    </span>
                  </div>
                </form>
              </Modal.Body>
            </Modal>
          </div> 
        </div>
        </>
    );
  }
}

export default Queries;
