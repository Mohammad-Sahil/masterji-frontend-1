import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import SearchBar from "./searchBar";
import "./fashionConsultant.css";
import "./table.css";
class FashionConsultants extends Component {
  state = {
    consultants: [],
    showModal: false,
    modalFields: {
      operation: "Create",
      consultant: {},
    },
    searchText: "",
    expandedConsultant:{}
  };

  componentDidMount() {
    fetch("http://localhost:4000/fashionConsultants")
      .then((response) => response.json())
      .then((consultants) => {
        console.log(consultants);
        this.setState({ consultants });
      });
  }

  handleModal(consultant, operation) {
    this.setState({ showModal: !this.state.showModal });
    let modalFields = {
      operation,
      consultant,
    };
    this.setState({ modalFields });
  }

  handleChange = (e) => {
    let modalFields = this.state.modalFields;
    modalFields.consultant[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ modalFields });
  };

  handleCreate = (e) => {
    e.preventDefault();
    const consultant = this.state.modalFields.consultant;
    const consultants = [consultant, ...this.state.consultants];
    this.setState({ consultants });
  };

  handleUpdate = (e) => {
    e.preventDefault();
    const consultant = this.state.modalFields.consultant;
    const consultants = [...this.state.consultants];
    const index = consultants.indexOf(consultant);
    consultants[index] = { ...consultant };
    this.setState({ consultants });
  };

  handleDelete = (consultant) => {
    const consultants = this.state.consultants.filter(
      (c) => c.userId !== consultant.userId
    );
    this.setState({ consultants });
  };

  search = (searchText) => {
    console.log(searchText);
    this.setState({ searchText });
  };

  expandConsultant = consultant => {
    this.setState({expandedConsultant:consultant})
  }

  render() {
    const { consultants, searchText, expandedConsultant } = this.state;
    let filteredConsultants = consultants;
    filteredConsultants = filteredConsultants.filter((consultant) => {
      for (let property in consultant) {
        if (consultant[property].includes(searchText)) return true;
      }
      return false;
    });
    return (
      <div>
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
        <div className="fashionConsultantContainer row m-0">
          <div id="fashionConsultantTable" className="fashionConsultantTable col-7">
            <div className="row">
              <div className="col-2">
                <button
                  type="button"
                  className="btn btn-warning addButton"
                  style={{ width: 105, color:'white' }}
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
                    <th scope="col">City</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Email</th>
                    <th scope="col">Expertise</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredConsultants.map((consultant) => (
                    <tr key={consultant.userId} onClick={() => this.expandConsultant(consultant)} style={expandedConsultant.userId === consultant.userId ? {backgroundColor:'#ffa'} : {}}>
                      <td>{consultant.name}</td>
                      <td>{consultant.city}</td>
                      <td>{consultant.contact}</td>
                      <td>{consultant.email}</td>
                      <td>{consultant.expertise}</td>
                      <td>
                        <button className="btn-warning editButton">
                          <i
                            class="fa fa-pencil"
                            aria-hidden="true"
                            onClick={() =>
                              this.handleModal(consultant, "Update")
                            }
                          ></i>
                        </button>
                      </td>
                      <td>
                        <button className="btn-danger deleteButton">
                          <i
                            class="fa fa-trash-o"
                            onClick={() => this.handleDelete(consultant)}
                          ></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {/* <tr>
                                <th scope="row">consultant.userId</th>
                                <td>consultant.namnewnrwnfn</td>
                                <td>consultant.city</td>
                                <td>consultant.contact</td>
                                <td>consultant.email</td>
                                <td>consultant.expertise</td>
                                <td>consultant.rate</td>
                                <td>consultant.userImage</td>
                                <td>consultant.workExperience</td>
                                <td>consultant.workSample</td>
                                <td><i class="fa fa-pencil-square-o fa-2x" style={{color:'gold', cursor:'pointer'}} aria-hidden="true" ></i></td>

                            <td><i class="fa fa-trash-o fa-2x" style={{color:'crimson'}}></i></td>
                        </tr> 
                        <tr>
                            <th scope="row">consultant.userId</th>
                            <td>consultant.namnewnrwnfn</td>
                            <td>consultant.city</td>
                            <td>consultant.contact</td>
                            <td>consultant.email</td>
                            <td>consultant.expertise</td>
                            <td>consultant.rate</td>
                            <td>consultant.userImage</td>
                            <td>consultant.workExperience</td>
                            <td>consultant.workSample</td>
                            <td><i class="fa fa-pencil-square-o fa-2x" style={{color:'gold', cursor:'pointer'}} aria-hidden="true" ></i></td>
                            <td><i class="fa fa-trash-o fa-2x" style={{color:'crimson'}}></i></td>
                        </tr> 
                        <tr>
                            <th scope="row">consultant.userId</th>
                            <td>consultant.namnewnrwnfn</td>
                            <td>consultant.city</td>
                            <td>consultant.contact</td>
                            <td>consultant.email</td>
                            <td>consultant.expertise</td>
                            <td>consultant.rate</td>
                            <td>consultant.userImage</td>
                            <td>consultant.workExperience</td>
                            <td>consultant.workSample</td>
                            <td><i class="fa fa-pencil-square-o fa-2x" style={{color:'gold', cursor:'pointer'}} aria-hidden="true" ></i></td>
                            <td><i class="fa fa-trash-o fa-2x" style={{color:'crimson'}}></i></td>
                        </tr>  */}
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
                    <label>First Name</label>
                    <input
                      type="text"
                      defaultValue={this.state.modalFields.consultant.name}
                      name="name"
                      className="form-control"
                      id="nameModal"
                      onChange={this.handleChange}
                      placeholder="Enter Name"
                    />
                  </div>
                  <br />
                  <div style={{ float: "right" }}>
                    <span>
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </span>
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
          <div id="fashionConsultantDetails" className="fashionConsultantDetails col-4 p-0">
            <div class="container m-0 p-0">
            <div class="card user-card">
                <div class="card-block">
                    <div class="user-image">
                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="img-radius" alt="User-Profile-Image" />
                    </div>
                    <h6 class="f-w-600 m-t-25 m-b-10" style={{fontSize:20}}>{expandedConsultant.name}</h6>
                    <p class="text">{expandedConsultant.expertise} &nbsp; | &nbsp;&nbsp; <i class="fa fa-building-o" aria-hidden="true"></i> {expandedConsultant.city}</p>
                    <p class="text"><i class="fa fa-envelope" aria-hidden="true"></i> {expandedConsultant.email}  &nbsp;&nbsp;&nbsp; <i class="fa fa-phone" aria-hidden="true"></i> {expandedConsultant.contact}</p>
                    <hr/>
                    <p class="m-t-15 text" style={{textAlign:'justify'}}>{expandedConsultant.workExperience}</p>

                    <p class="text m-t-15" style={{fontSize:20, fontWeight:600}}>Price : {expandedConsultant.rate}</p>

                    <p  class="text m-t-15"> Work Samples</p>

                    {/* <ul class="list-unstyled activity-leval">
                        <li class="active"></li>
                        <li class="active"></li>
                        <li class="active"></li>
                        <li></li>
                        <li></li>
                    </ul>
                    <div class="bg-c-yellow counter-block m-t-10 p-20">
                        <div class="row">
                            <div class="col-4">
                                <i class="fa fa-comment"></i>
                                <p>1256</p>
                            </div>
                            <div class="col-4">
                                <i class="fa fa-user"></i>
                                <p>8562</p>
                            </div>
                            <div class="col-4">
                                <i class="fa fa-suitcase"></i>
                                <p>189</p>
                            </div>
                        </div>
                    </div>
                    <p class="m-t-15 text-muted">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    <hr/>
                    <div class="row justify-content-center user-social-link">
                        <div class="col-auto"><a href="#!"><i class="fa fa-facebook text-facebook"></i></a></div>
                        <div class="col-auto"><a href="#!"><i class="fa fa-twitter text-twitter"></i></a></div>
                        <div class="col-auto"><a href="#!"><i class="fa fa-dribbble text-dribbble"></i></a></div>
                    </div>*/}
                </div> 
	</div>
</div>
          </div>
        </div>
      </div>
    );
  }
}

export default FashionConsultants;
