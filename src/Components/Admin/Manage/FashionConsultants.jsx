import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { storage } from "../../../firebase";
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage';
import {v4} from 'uuid';

import SearchBar from "./searchBar";
import "./fashionConsultant.css";
import "./table.css";
import Metadata from "../../Metadata";


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

  //api_url = "http://localhost:5000/masterji-online/us-central1/app/";
  api_url = "https://us-central1-masterji-online.cloudfunctions.net/app/";


  componentDidMount() {
    fetch(this.api_url+"fashionConsultant/v2/get")
      .then((response) => response.json())
      .then((consultants) => {
        console.log(consultants);
        this.setState({ consultants });
      })
      .catch(err => toast.error(err.message));

  }

  handleModal(consultant, operation) {
    let modalFields = {
      operation,
      consultant,
    };
    this.setState({ modalFields,showModal: !this.state.showModal });
  }

  handleChange = (e) => {
    let modalFields = this.state.modalFields;
    modalFields.consultant[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ modalFields });
  };

  handleImageUpload = (e) => {
    let modalFields = this.state.modalFields;
    // let fileObj =  e.target.files[0];
    // console.log(fileObj);
    // var newFileObject  = {
    //   'lastModified'     : fileObj.lastModified,
    //   'lastModifiedDate' : fileObj.lastModifiedDate,
    //   'name'             : fileObj.name,
    //   'size'             : fileObj.size,
    //   'type'             : fileObj.type
    // };  
    // modalFields.consultant[e.currentTarget.name] = newFileObject;
    // console.log(modalFields.consultant);
    // this.setState({ modalFields });

   /* const toastId = React.useRef(null);

    let image = e.target.files[0];
    const storageRef = ref(storage, `images/${image.name + v4()}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
     uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (toastId.current === null) {
          toastId.current = toast('Upload in Progress', { progress });
        } else {
          toast.update(toastId.current, { progress });
        }

        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      }, 
      (error) => {
        toast.error(error.message);
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          modalFields.consultant['userImage'] = downloadURL;
          toast.success('Image uploaded successfully');
        });
      }
    );

    console.log(modalFields)*/

  };

  handleWorkSampleImages = e => {

  }

  handleCreate = (e) => {
    e.preventDefault();
    const consultant = this.state.modalFields.consultant;
    console.log(consultant);
    fetch(this.api_url + "fashionConsultant/v2/post", {
        method:"POST",
        body:JSON.stringify({...consultant}),
        headers:{"Content-Type" : "application/json"}
    })
    .then(response => response.json())
    .then((data) => {
        const consultants = [data.data, ...this.state.consultants];
        toast.success(data.message);
        this.setState({ consultants, showModal:false  });
    })
    .catch(err => {
      toast.error(err)});
  };

  handleUpdate = (e) => {
    e.preventDefault();
    const consultant = this.state.modalFields.consultant;
      fetch(this.api_url + "fashionConsultant/v2/put/" + consultant.id, {
          method:"PUT",
          body:JSON.stringify({...consultant}),
          headers:{"Content-Type" : "application/json"}
      })
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        const consultants = [...this.state.consultants];
        const index = consultants.indexOf(consultant);
        consultants[index] = { ...data.data };
        toast.success(data.message);
        this.setState({ consultants, showModal:false });
      })
      .catch(err => toast.error(err));
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
            toast.success(data.message);
            this.setState({ consultants });
        })
        .catch(err => toast.error(err));
   
  };

  deleteWorkSample = (index, sample) => {
    alert('Do you want to delete the sample');
    let expandedConsultant = this.state.expandedConsultant;
    expandedConsultant.workSamples.splice(index,1);
    this.setState({expandedConsultant});
  }

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
      <>
      <Metadata title='Fashion Consultant | Admin | Masterji'/>
      <ToastContainer/>
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
                  style={{ width: '100%' }}
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
                  {/* <div className="form-group">
                    <label>User Image</label>
                    <input type="text" defaultValue={modalConsultant.userImage} name="userImage" className="form-control" id="nameModal" onChange={this.handleChange} placeholder="Enter User Image"/>
                  </div>
                  <br /> */}
                  <div className="form-group">
                    <label>Upload User Image</label>
                    <input type="file" name="userImage" className="form-control" id="imageModal" onChange={this.handleImageUpload} placeholder="Enter User Image" />
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Upload Work Samples</label>
                    <input type="file" name="workSamples" className="form-control" id="imageModal" onChange={this.handleWorkSampleImages} placeholder="Enter User Image" multiple/>
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

                    <p class="text m-t-15" style={{fontSize:20, fontWeight:600}}>{expandedConsultant.rate && "Price : Rs. "} {expandedConsultant.rate}</p>
                    <hr />
                    {expandedConsultant.workSamples && 
                    <div className="work-samples">
                      <p  class="text m-t-15" style={{fontWeight:500, fontSize:18}}> Work Samples</p>
                      <div className="work-samples">
                      <div class="work-samples-grid">
                        {expandedConsultant.workSamples.map((sample, index) => 
                          <a>
                            <div className="img-container">
                            <img src={sample} alt="work sample" />
                            </div>
                            <button className="btn" onClick={() => this.deleteWorkSample(index, sample)}>X</button>
                          </a>
                        )}

                          <a>
                            <div className="img-container">
                              <div className="upload-image-wrapper">
                              <div className="file-upload">
                                <input type="file" name="uploadWorkSample" id="uploadWorkSample" />
                                <i class="fa fa-arrow-up"></i>
                              </div>
                              </div>
                            </div>
                          </a>
                      </div>
                    </div>
                    </div>
                    }

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
      </>
    );
  }
}

export default FashionConsultants;
