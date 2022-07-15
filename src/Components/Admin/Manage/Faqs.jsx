import React, { Component } from "react";
import { Modal } from "react-bootstrap";

import "./table.css";
class FAQs extends Component {
  state = {
    faqs: [],
    showModal: false,
  };

  componentDidMount() {
    fetch("http://localhost:4000/faqs")
      .then((response) => response.json())
      .then((faqs) => {
        console.log(faqs);
        this.setState({ faqs });
      });
  }

  render() {
    return (
      <div>
        <br />
        <br />
        <br />
        {/* <h4>Add Consultants</h4>
                <br />
                <form onSubmit>
                    <div className="form-group">
                        <input type="text" className="form-control" id="name" placeholder="Enter Name" />
                    </div>
                    <br />
                    <div className="form-group">
                        <input type="text" className="form-control" id="email" placeholder="Enter Email" />
                    </div>
                    <br />
                    <div className="form-group">
                        <input type="text" className="form-control" id="contact" placeholder="Enter Contact" />
                    </div>
                    <br />
                    <div className="form-group">
                        <input type="text" className="form-control" id="city" placeholder="Enter City" />
                    </div>
                    <br />
                    <div className="form-group">
                        <input type="text" className="form-control" id="expertise" placeholder="Enter Expertise" />
                    </div>
                    <br />
                    <div className="form-group">
                        <input type="text" className="form-control" id="workExperience" placeholder="Enter Work Experience" />
                    </div>
                    <br />
                    <div className="form-group">
                        <input type="text" className="form-control" id="rate" placeholder="Enter Rate" />
                    </div>
                    <br />
                    <div className="form-group">
                        <input type="text" className="form-control" id="workSample" placeholder="Enter Work Samples" />
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form> */}
        <div class="table-responsive tableDiv">
          <table className="table table-striped table-condensed">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Number</th>
                <th scope="col">Created At</th>
                <th scope="col">Question</th>
                <th scope="col">Solution</th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {this.state.faqs.map((faq) => (
                <tr key={faq.number}>
                  <th scope="row">{faq.number}</th>
                  <td>{faq.createdAt}</td>
                  <td>{faq.question}</td>
                  <td>{faq.solution}</td>
                  <td>
                    {" "}
                    <button type="button" className="btn btn-sm btn-warning">
                      Update
                    </button>
                  </td>
                  <td>
                    <i
                      class="fa fa-trash-o fa-2x"
                      style={{ color: "crimson" }}
                    ></i>
                  </td>
                </tr>
              ))}
              <tr>
                <th scope="row">faq.number</th>
                <td>faq.createdAt</td>
                <td>faq.question</td>
                <td>faq.solution</td>
                <td>
                  {" "}
                  <button type="button" className="btn btn-sm btn-warning">
                    Update
                  </button>
                </td>
                <td>
                  <i
                    class="fa fa-trash-o fa-2x"
                    style={{ color: "crimson" }}
                  ></i>
                </td>
              </tr>
              <tr>
                <th scope="row">faq.number</th>
                <td>faq.createdAt</td>
                <td>faq.question</td>
                <td>faq.solution</td>
                <td>
                  {" "}
                  <button type="button" className="btn btn-sm btn-warning">
                    Update
                  </button>
                </td>
                <td>
                  <i
                    class="fa fa-trash-o fa-2x"
                    style={{ color: "crimson" }}
                  ></i>
                </td>
              </tr>
              <tr>
                <th scope="row">faq.number</th>
                <td>faq.createdAt</td>
                <td>faq.question</td>
                <td>faq.solution</td>
                <td>
                  {" "}
                  <button type="button" className="btn btn-sm btn-warning">
                    Update
                  </button>
                </td>
                <td>
                  <i
                    class="fa fa-trash-o fa-2x"
                    style={{ color: "crimson" }}
                  ></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Modal show={this.state.showModal}>
          <Modal.Header>{this.state.modalFields.operation} Entry</Modal.Header>
          <Modal.Body>
            <form onSubmit={this.updateEntry}>
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  defaultValue={this.state.modalFields.consultant.name}
                  className="form-control"
                  id="firstNameModal"
                  placeholder="Enter First Name"
                />
              </div>
              <br />
              <div style={{ float: "right" }}>
                <span>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </span>
                &nbsp;&nbsp;&nbsp;
                <span>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => this.setState({ showModal: false })}
                  >
                    Close
                  </button>
                </span>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default FAQs;
