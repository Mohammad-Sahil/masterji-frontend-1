import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import SearchBar from "./searchBar";
import Metadata from '../../Metadata';
import "./table.css";
class About extends Component {
  state = {
    entries: [],
    showModal: false,
    modalFields: {
      operation: "Create",
      entry: {},
    },
    searchText: ""
  };

  api_url = "https://us-central1-masterji-online.cloudfunctions.net/app/";

  componentDidMount() {
    fetch(this.api_url+"aboutus/v2/get")
      .then((response) => response.json())
      .then((entries) => {
        console.log(entries);
        this.setState({ entries });
      });
  }

  handleModal(entry, operation) {
    this.setState({ showModal: !this.state.showModal });
    let modalFields = {
      operation,
      entry,
    };
    this.setState({ modalFields });
  }

  handleChange = (e) => {
    let modalFields = this.state.modalFields;
    modalFields.entry[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ modalFields });
  };

  handleCreate = (e) => {
    e.preventDefault();
    const entry = this.state.modalFields.entry;
    fetch(this.api_url + "aboutus/v2/post", {
        method:"POST",
        body:JSON.stringify({...entry}),
        headers:{"Content-Type" : "application/json"}
    })
    .then(response => response.json())
    .then((data) => {
        console.log(data);
        const entries = [data.data, ...this.state.entries];
        this.setState({ entries, showModal:false  });
    })
    .catch(err => console.log(err));
  };

  handleUpdate = (e) => {
    e.preventDefault();
    const entry = this.state.modalFields.entry;
      fetch(this.api_url + "aboutus/v2/put/" + entry.id, {
          method:"PUT",
          body:JSON.stringify({...entry}),
          headers:{"Content-Type" : "application/json"}
      })
      .then(response => {
        console.log(response);
        response.json();
      })
      .then((data) => {
        console.log(data);
        const entries = [...this.state.entries];
        const index = entries.indexOf(entry);
        entries[index] = { ...data.data };
        this.setState({ entries, showModal:false });
      })
      .catch(err => console.log("err" + err))
  };

  handleDelete = (entry) => {

    fetch(this.api_url + "aboutus/v2/delete/" + entry.id,{
            method:"DELETE"
        })
        .then(response => response.json())
        .then((data)=>{
            console.log(data);
            const entries = this.state.entries.filter(
              (c) => c.id !== entry.id
            );
            this.setState({ entries });
        })
        .catch(err => console.log(err));
   
  };

  search = (searchText) => {
    console.log(searchText);
    this.setState({ searchText });
  };

  render() {
    const { entries, searchText } = this.state;
    const modalEntry = this.state.modalFields.entry;
    let filteredEntries = entries;
    filteredEntries = filteredEntries.filter((entry) => {
      for (let property in entry) {
        if (typeof entry[property] === 'string' && entry[property].toLowerCase().includes(searchText.toLowerCase())) return true;
      }
      return false;
    });
    return (
      <>
      <Metadata title='About | Admin | Masterji'/>
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
                    <th scope="col">Serial No</th>
                    <th scope="col">Heading</th>
                    <th scope="col">Content</th>
                    <th scope="col">Created at</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEntries.map((entry) => (
                    <tr key={entry.serialNo}>
                      <td>{entry.serialNo}</td>
                      <td>{entry.heading}</td>
                      <td>{entry.content}</td>
                      <td>{entry.createdAt}</td>
                      <td>
                        <button className="btn-warning editButton" onClick={() =>this.handleModal(entry, "Update")}>
                          <i class="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                      </td>
                      <td>
                        <button className="btn-danger deleteButton" onClick={() => this.handleDelete(entry)}>
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
                {this.state.modalFields.operation} Entry
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
                    <label>Serial No</label>
                    <input type="text" defaultValue={modalEntry.serialNo} name="serialNo" className="form-control" id="serialNoModal" onChange={this.handleChange} placeholder="Enter Serial No"/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Heading</label>
                    <input type="text" defaultValue={modalEntry.heading} name="heading" className="form-control" id="headingModal" onChange={this.handleChange} placeholder="Enter Heading"/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Content</label>
                    <input type="text" defaultValue={modalEntry.content} name="content" className="form-control" id="contentModal" onChange={this.handleChange} placeholder="Enter Content"/>
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

export default About;
