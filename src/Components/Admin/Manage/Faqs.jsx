import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import SearchBar from "./searchBar";
import Metadata from "../../Metadata";

import "./table.css";
class FAQs extends Component {
  state = {
    faqs: [],
    showModal: false,
    modalFields: {
      operation: "Create",
      faq: {},
    },
    searchText: ""
  };

  api_url = "https://us-central1-masterji-online.cloudfunctions.net/app/";

  componentDidMount() {
    fetch(this.api_url+"faqs/v2/get")
      .then((response) => response.json())
      .then((faqs) => {
        console.log(faqs);
        this.setState({ faqs });
      });
  }

  handleModal(faq, operation) {
    this.setState({ showModal: !this.state.showModal });
    let modalFields = {
      operation,
      faq,
    };
    this.setState({ modalFields });
  }

  handleChange = (e) => {
    let modalFields = this.state.modalFields;
    modalFields.faq[e.currentTarget.name] = e.currentTarget.value;

    this.setState({ modalFields });
  };

  handleCreate = (e) => {
    e.preventDefault();
    const faq = this.state.modalFields.faq;
    fetch(this.api_url + "faqs/v2/post", {
        method:"POST",
        body:JSON.stringify({...faq}),
        headers:{"Content-Type" : "application/json"}
    })
    .then(response => response.json())
    .then((data) => {
        console.log(data);
        const faqs = [data.data, ...this.state.faqs];
        this.setState({ faqs, showModal:false  });
    })
    .catch(err => console.log(err));
  };

  handleUpdate = (e) => {
    e.preventDefault();
    const faq = this.state.modalFields.faq;

      fetch(this.api_url + "faqs/v2/put/" + faq.id, {
          method:"PUT",
          body:JSON.stringify({...faq}),
          headers:{"Content-Type" : "application/json"}
      })
      .then(response => {
        console.log(response);
        response.json();
      })
      .then((data) => {
        console.log(data);
        const faqs = [...this.state.faqs];
        const index = faqs.indexOf(faq);
        faqs[index] = { ...data.data };
        this.setState({ faqs, showModal:false });
      })
      .catch(err => console.log("err" + err))
  };

  handleDelete = (faq) => {

    fetch(this.api_url + "faqs/v2/delete/" + faq.id,{
            method:"DELETE"
        })
        .then(response => response.json())
        .then((data)=>{
            console.log(data);
            const faqs = this.state.faqs.filter(
              (c) => c.id !== faq.id
            );
            this.setState({ faqs });
        })
        .catch(err => console.log(err));
   
  };

  search = (searchText) => {
    console.log(searchText);
    this.setState({ searchText });
  };

  render() {
    const { faqs, searchText } = this.state;
    const modalFAQ = this.state.modalFields.faq;
    let filteredFaqs = faqs;
    filteredFaqs = filteredFaqs.filter((faq) => {
      for (let property in faq) {
        if (typeof faq[property] === 'string' && faq[property].toLowerCase().includes(searchText.toLowerCase())) return true;
      }
      return false;
    });
    return (
      <>
      
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
                    <th scope="col">No</th>
                    <th scope="col">Question</th>
                    <th scope="col">Solution</th>
                    <th scope="col">Created at</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFaqs.map((faq) => (
                    <tr key={faq.no}>
                      <td>{faq.no}</td>
                      <td>{faq.ques}</td>
                      <td>{faq.solution}</td>
                      <td>{faq.createdAt}</td>
                      <td>
                        <button className="btn-warning editButton" onClick={() =>this.handleModal(faq, "Update")}>
                          <i class="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                      </td>
                      <td>
                        <button className="btn-danger deleteButton" onClick={() => this.handleDelete(faq)}>
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
                {this.state.modalFields.operation} FAQ
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
                    <label>Question</label>
                    <input type="text" defaultValue={modalFAQ.ques} name="ques" className="form-control" id="quesModal" onChange={this.handleChange} placeholder="Enter Question"/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Solution</label>
                    <input type="text" defaultValue={modalFAQ.solution} name="solution" className="form-control" id="solutionModal" onChange={this.handleChange} placeholder="Enter Solution"/>
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

export default FAQs;
