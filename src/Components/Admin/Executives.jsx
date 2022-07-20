// import React from "react";
import React, { Component } from "react";
import "./Manage/table.css";
import { Modal } from "react-bootstrap";

import SearchBar from "./Manage/searchBar";

const DUMMY_Data = [
  {
    id: "m1",
    Executives: "Tester",
    Mobile: "1234567890",
    AssignedArea: "tester",
    city: "tester",
    picode: "4444444",
    email: "tester@gmail.com",
    Address: "Tester",
    Order: "1",
  },
];

class Executives extends Component {
  state = {
    executives: [],
    showModal: false,
    modalFields: {
      operation: "Create",
      executive: {},
    },
    searchText: ""
  };

  api_url = "https://us-central1-masterji-online.cloudfunctions.net/app/";

  componentDidMount() {
    fetch(this.api_url+"executives/v2/get")
      .then((response) => response.json())
      .then((executives) => {
        console.log(executives);
        this.setState({ executives });
      });
  }

  handleModal(executive, operation) {
    this.setState({ showModal: !this.state.showModal });
    let modalFields = {
      operation,
      executive,
    };
    this.setState({ modalFields });
  }

  handleChange = (e) => {
    let modalFields = this.state.modalFields;
    modalFields.executive[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ modalFields });
  };

  handleCreate = (e) => {
    e.preventDefault();
    const executive = this.state.modalFields.executive;
    fetch(this.api_url + "executives/v2/post", {
        method:"POST",
        body:JSON.stringify({...executive}),
        headers:{"Content-Type" : "application/json"}
    })
    .then(response => response.json())
    .then((data) => {
        console.log(data);
        const executives = [executive, ...this.state.executives];
        this.setState({ executives, showModal:false  });
    })
    .catch(err => console.log(err));
  };

  handleUpdate = (e) => {
    e.preventDefault();
    const executive = this.state.modalFields.executive;
      fetch(this.api_url + "executives/v2/put/" + executive.id, {
          method:"PUT",
          body:JSON.stringify({...executive}),
          headers:{"Content-Type" : "application/json"}
      })
      .then(response => {
        console.log(response);
        response.json();
      })
      .then((data) => {
        console.log(data);
        const executives = [...this.state.executives];
        const index = executives.indexOf(executive);
        executives[index] = { ...executive };
        this.setState({ executives, showModal:false });
      })
      .catch(err => console.log("err" + err))
  };

  handleDelete = (executive) => {

    fetch(this.api_url + "executives/v2/delete/" + executive.id,{
            method:"DELETE"
        })
        .then(response => response.json())
        .then((data)=>{
            console.log(data);
            const executives = this.state.executives.filter(
              (c) => c.id !== executive.id
            );
            this.setState({ executives });
        })
        .catch(err => console.log(err));
   
  };

  search = (searchText) => {
    console.log(searchText);
    this.setState({ searchText });
  };

  render() {
    const { executives, searchText } = this.state;
    const modalExecutive = this.state.modalFields.executive;
    let filteredexecutives = executives;
    filteredexecutives = filteredexecutives.filter((executive) => {
      for (let property in executive) {
        if (typeof executive[property] === 'string' && executive[property].toLowerCase().includes(searchText.toLowerCase())) return true;
      }
      return false;
    });
    return (
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
                    <th scope="col">Name</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Email</th>
                    <th scope="col">Address</th>
                    <th scope="col">City</th>
                    <th scope="col">Pincode</th>
                    <th scope="col">Assigned Area</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredexecutives.map((executive) => (
                    <tr key={executive.name}>
                      <td>{executive.id}</td>
                      <td>{executive.email}</td>
                      <td>{executive.address}</td>
                      <td>{executive.city}</td>
                      <td>{executive.pincode}</td>
                      <td>{executive.assignedArea}</td>
                      <td>
                        <button className="btn-warning editButton" onClick={() =>this.handleModal(executive, "Update")}>
                          <i class="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                      </td>
                      <td>
                        <button className="btn-danger deleteButton" onClick={() => this.handleDelete(executive)}>
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
                {this.state.modalFields.operation} Executive
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
                    <label>Name</label>
                    <input type="text" defaultValue={modalExecutive.name} name="name" className="form-control" id="nameModal" onChange={this.handleChange} placeholder="Enter Question"/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Contact</label>
                    <input type="text" defaultValue={modalExecutive.id} name="id" className="form-control" id="idModal" onChange={this.handleChange} placeholder="Enter Contact Number"/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Email</label>
                    <input type="text" defaultValue={modalExecutive.email} name="email" className="form-control" id="emailModal" onChange={this.handleChange} placeholder="Enter Email"/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Address</label>
                    <input type="text" defaultValue={modalExecutive.address} name="address" className="form-control" id="addressModal" onChange={this.handleChange} placeholder="Enter Address"/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>City</label>
                    <input type="text" defaultValue={modalExecutive.city} name="city" className="form-control" id="cityModal" onChange={this.handleChange} placeholder="Enter City"/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Pin Code</label>
                    <input type="text" defaultValue={modalExecutive.pincode} name="pincode" className="form-control" id="pincodeModal" onChange={this.handleChange} placeholder="Enter Pin Code"/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Assigned Area</label>
                    <input type="text" defaultValue={modalExecutive.assignedArea} name="assignedArea" className="form-control" id="assignedAreaModal" onChange={this.handleChange} placeholder="Enter Assigned Area"/>
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
    );
  }
}

export default Executives;
