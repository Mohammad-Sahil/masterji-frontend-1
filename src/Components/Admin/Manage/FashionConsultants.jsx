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

  api_url = "https://us-central1-masterji-online.cloudfunctions.net/app/";

  componentDidMount() {
    fetch(this.api_url+"fashionConsultant/v2/get")
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
    console.log(modalFields.consultant)
    this.setState({ modalFields });
  };

  handleCreate = (e) => {
    e.preventDefault();
    const consultant = this.state.modalFields.consultant;
    fetch(this.api_url + "fashionConsultant/v2/post", {
        method:"POST",
        body:JSON.stringify({...consultant}),
        headers:{"Content-Type" : "application/json"}
    })
    .then(response => response.json())
    .then((data) => {
        console.log(data);
        const consultants = [consultant, ...this.state.consultants];
        this.setState({ consultants, showModal:false  });
    })
    .catch(err => console.log(err));
  };

  handleUpdate = (e) => {
    e.preventDefault();
    const consultant = this.state.modalFields.consultant;
      fetch(this.api_url + "fashionConsultant/v2/put/" + consultant.id, {
          method:"PUT",
          body:JSON.stringify({...consultant}),
          headers:{"Content-Type" : "application/json"}
      })
      .then(response => {
        console.log(response);
        response.json();
      })
      .then((data) => {
        console.log(data);
        const consultants = [...this.state.consultants];
        const index = consultants.indexOf(consultant);
        consultants[index] = { ...consultant };
        this.setState({ consultants, showModal:false });
      })
      .catch(err => console.log("err" + err))
  };

  handleDelete = (consultant) => {

    fetch(this.api_url + "fashionConsultant/v2/delete/" + consultant.id,{
            method:"DELETE"
        })
        .then(response => response.json())
        .then((data)=>{
            console.log(data);
            const consultants = this.state.consultants.filter(
              (c) => c.id !== consultant.id
            );
            this.setState({ consultants });
        })
        .catch(err => console.log(err));
   
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
    const modalConsultant = this.state.modalFields.consultant;
    let filteredConsultants = consultants;
    filteredConsultants = filteredConsultants.filter((consultant) => {
      for (let property in consultant) {
        if (typeof consultant[property] === 'string' && consultant[property].toLowerCase().includes(searchText.toLowerCase())) return true;
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
        <div className="fashionConsultantContainer row gx-0" style={Object.keys(expandedConsultant).length === 0 ? {marginRight:50}:{}}>
          <div id="fashionConsultantTable" className={ Object.keys(expandedConsultant).length === 0 ? "fashionConsultantTable" : "fashionConsultantTable col-7"}>
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
                    <tr key={consultant.id} onClick={() => this.expandConsultant(consultant)} style={expandedConsultant.id === consultant.id ? {backgroundColor:'#ffa', cursor:'pointer'} : {cursor:'pointer'}}>
                      <td>{consultant.name}</td>
                      <td>{consultant.city}</td>
                      <td>{consultant.contact}</td>
                      <td>{consultant.email}</td>
                      <td>{consultant.expertise}</td>
                      <td>
                        <button className="btn-warning editButton" onClick={() =>this.handleModal(consultant, "Update")}>
                          <i class="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                      </td>
                      <td>
                        <button className="btn-danger deleteButton" onClick={() => this.handleDelete(consultant)}>
                          <i class="fa fa-trash-o"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                  {/* <tr>
                                <th scope="row">consultant.id</th>
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
                            <th scope="row">consultant.id</th>
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
                            <th scope="row">consultant.id</th>
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
                {this.state.modalFields.operation} Consultant
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
                    <input type="text" defaultValue={modalConsultant.name} name="name" className="form-control" id="nameModal" onChange={this.handleChange} placeholder="Enter Name"/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>City</label>
                    <input type="text" defaultValue={modalConsultant.city} name="city" className="form-control" id="nameModal" onChange={this.handleChange} placeholder="Enter City"/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Contact</label>
                    <input type="text" defaultValue={modalConsultant.contact} name="contact" className="form-control" id="nameModal" onChange={this.handleChange} placeholder="Enter Contact"/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Email</label>
                    <input type="text" defaultValue={modalConsultant.email} name="email" className="form-control" id="nameModal" onChange={this.handleChange} placeholder="Enter Email"/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Expertise</label>
                    <input type="text" defaultValue={modalConsultant.expertise} name="expertise" className="form-control" id="nameModal" onChange={this.handleChange} placeholder="Enter Expertise"/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Work Experience</label>
                    <input type="text" defaultValue={modalConsultant.workExperience} name="workExperience" className="form-control" id="nameModal" onChange={this.handleChange} placeholder="Enter Work Experience"/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Price</label>
                    <input type="text" defaultValue={modalConsultant.rate} name="rate" className="form-control" id="nameModal" onChange={this.handleChange} placeholder="Enter Price"/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>User Image</label>
                    <input type="text" defaultValue={modalConsultant.userImage} name="userImage" className="form-control" id="nameModal" onChange={this.handleChange} placeholder="Enter User Image"/>
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
          { Object.keys(expandedConsultant).length !== 0 &&
          <div id="fashionConsultantDetails" className="fashionConsultantDetails col-4 p-0">
            <div class="container m-0 p-0">
            <div class="card user-card">
                <div class="card-block">
                    <div class="user-image">
                        <img src={expandedConsultant.userImage ? expandedConsultant.userImage : "https://p.kindpng.com/picc/s/78-785975_icon-profile-bio-avatar-person-symbol-chat-icon.png"} class="img-radius" alt="User-Profile-Image" />
                    </div>
                    <h6 class="f-w-600 m-t-25 m-b-10" style={{fontSize:20}}>{expandedConsultant.name} &nbsp; <span style={{fontWeight:300, fontSize:20}}>{expandedConsultant.city && <i class="fa fa-building-o" aria-hidden="true"></i>} {expandedConsultant.city}</span></h6>
                    <p class="text">{expandedConsultant.expertise}</p>
                    <p class="text">{expandedConsultant.email && <i class="fa fa-envelope" aria-hidden="true"></i>} {expandedConsultant.email}  &nbsp;&nbsp;&nbsp; {expandedConsultant.contact && <i class="fa fa-phone" aria-hidden="true"></i>} {expandedConsultant.contact}</p>
                    <hr/>
                    <p class="m-t-15 text" style={{textAlign:'justify'}}>{expandedConsultant.workExperience}</p>

                    <p class="text m-t-15" style={{fontSize:20, fontWeight:600}}>{expandedConsultant.rate && "Price :"} {expandedConsultant.rate}</p>

                    {expandedConsultant.workSamples && <p  class="text m-t-15"> Work Samples</p>}

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
  }
        </div>
      </div>
    );
  }
}

export default FashionConsultants;
