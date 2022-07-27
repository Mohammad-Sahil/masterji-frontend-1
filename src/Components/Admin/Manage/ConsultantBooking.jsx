import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SearchBar from "./searchBar";
import "./fabricShop.css";
import "./table.css";
import Metadata from "../../Metadata";
class ConsultantBooking extends Component {
  state = {
    bookings: [],
    showModal: false,
    modalFields: {
      operation: "Create",
      booking: {},
    },
    consultants : [],
    searchText: "",
    expandedBooking:{
    }
  };

  api_url = "https://us-central1-masterji-online.cloudfunctions.net/app/";

  componentDidMount() {
    fetch(this.api_url+"consultantbooking/v2/get")
      .then((response) => response.json())
      .then((bookings) => {
        this.setState({ bookings });
      })
      .catch(err => toast.error(err.message));

    fetch(this.api_url+"fashionConsultant/v2/get")
      .then((response) => response.json())
      .then((consultants) => {
        this.setState({ consultants });
      })
      .catch(err => toast.error(err.message));

  }

  handleModal(booking, operation) {
    this.setState({ showModal: !this.state.showModal });
    let modalFields = {
      operation,
      booking,
    };
    this.setState({ modalFields });
  }

  handleChange = (e) => {
    let modalFields = this.state.modalFields;
    modalFields.booking[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ modalFields });
  };

  handleCreate = (e) => {
    e.preventDefault();
    const booking = this.state.modalFields.booking;
    fetch(this.api_url + "consultantbooking/v2/post", {
        method:"POST",
        body:JSON.stringify({...booking}),
        headers:{"Content-Type" : "application/json"}
    })
    .then(response => response.json())
    .then((data) => {
        console.log(data);
        const bookings = [data.data, ...this.state.bookings];
        toast.success(data.message);
        this.setState({ bookings, showModal:false  });
    })
    .catch(err => toast.error(err));
    
  };

  handleUpdate = (e) => {
    e.preventDefault();
    const booking = this.state.modalFields.booking;
      fetch(this.api_url + "consultantbooking/v2/put/" + booking.id, {
          method:"PUT",
          body:JSON.stringify({...booking}),
          headers:{"Content-Type" : "application/json"}
      })
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        const bookings = [...this.state.bookings];
        const index = bookings.indexOf(booking);
        bookings[index] = { ...data.data };
        toast.success(data.message);
        this.setState({ bookings, showModal:false });
      })
      .catch(err => toast.error(err));
  };

  handleDelete = (booking) => {

    fetch(this.api_url + "consultantbooking/v2/delete/" + booking.id,{
            method:"DELETE"
        })
        .then(response => response.json())
        .then((data)=>{
            console.log(data);
            const bookings = this.state.bookings.filter(
              (c) => c.id !== booking.id
            );
            toast.success(data.message);
            this.setState({ bookings });
        })
        .catch(err => toast.error(err));
  };

  search = (searchText) => {
    console.log(searchText);
    this.setState({ searchText });
  };

  expandBooking = booking => {
    this.setState({expandedBooking:booking})
  }

  handleConsultantChange = e => {
    let modalFields = this.state.modalFields;
    let index = e.currentTarget.value;
    let consultant = this.state.consultants[index];
    modalFields.booking['consultantId'] = consultant.id;
    modalFields.booking['consultantName'] = consultant.name;
    modalFields.booking['expertise'] = consultant.expertise;
    modalFields.booking['consultantImage'] = consultant.userImage;
    this.setState({ modalFields });
  }

  render() {
    const { bookings, searchText, expandedBooking } = this.state;
    const modalBooking = this.state.modalFields.booking;
    let filteredBookings = bookings;
    filteredBookings = filteredBookings.filter((booking) => {
      for (let property in booking) {
        if (typeof booking[property] === 'string' && booking[property].toLowerCase().includes(searchText.toLowerCase())) return true;
      }
      return false;
    });
    return (
      <>
      <Metadata title='Consultant Bookings | Admin | Masterji'/>
      <div>
      <ToastContainer/>

        <div className="fashionConsultantContainer row gx-0" style={Object.keys(expandedBooking).length === 0 ? {marginRight:50}:{}}>
          <div id="fabricShopTable" className={ Object.keys(expandedBooking).length === 0 ? "fabricShopTable" : "fabricShopTable col-6"}>
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
                    <th scope="col">Sr No</th>
                    <th scope="col">Booking Id</th>
                    <th scope="col">User Contact</th>
                    <th scope="col">Booking Date</th>
                    <th scope="col">Order Date</th>
                    <th scope="col">Consultant Name</th>
                    <th scope="col">Amount</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking,index) => (
                    <tr key={booking.id} onClick={() => this.expandBooking(booking)} style={expandedBooking.id === booking.id ? {backgroundColor:'#ffa', cursor:'pointer'} : {cursor:'pointer'}}>
                      <td>{index}</td>
                      <td>{booking.bookingId}</td>
                      <td>{booking.userId}</td>
                      <td>{booking.bookingDate}</td>
                      <td>{booking.orderDate}</td>
                      <td>{booking.consultantName}</td>
                      <td>{booking.amount}</td>
                      <td>
                        <button className="btn-warning editButton" onClick={() =>this.handleModal(booking, "Update")}>
                          <i class="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                      </td>
                      <td>
                        <button className="btn-danger deleteButton" onClick={() => this.handleDelete(booking)}>
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
                {this.state.modalFields.operation} Booking
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
                    <label>Booking Id</label>
                    <input type="text" defaultValue={modalBooking.bookingId} name="bookingId" className="form-control" id="bookingIdModal" onChange={this.handleChange} placeholder="Enter User Contact"/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>User Contact</label>
                    <input type="text" defaultValue={modalBooking.userId} name="userId" className="form-control" id="userIdModal" onChange={this.handleChange} placeholder="Enter User Contact"/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Booking Date</label>
                    <input type="text" defaultValue={modalBooking.bookingDate} name="bookingDate" className="form-control" id="bookingDateModal" onChange={this.handleChange} placeholder="Enter Booking Date"/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Booking Time</label>
                    <input type="text" defaultValue={modalBooking.bookingTime} name="bookingTime" className="form-control" id="bookingTimeModal" onChange={this.handleChange} placeholder="Enter Booking Time"/>
                  </div>
                  <br />
                  {/* <div className="form-group">
                    <label>Order Date</label>
                    <input type="text" defaultValue={modalBooking.orderDate} name="orderDate" className="form-control" id="nameModal" onChange={this.handleChange} placeholder="Enter Order Date"/>
                  </div>
                  <br /> */}
                  <div className="form-group">
                    <label>Payment Id</label>
                    <input type="text" defaultValue={modalBooking.paymentId} name="paymentId" className="form-control" id="nameModal" onChange={this.handleChange} placeholder="Enter Payment Id"/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Amount</label>
                    <input type="text" defaultValue={modalBooking.amount} name="amount" className="form-control" id="nameModal" onChange={this.handleChange} placeholder="Enter Amount"/>
                  </div>
                  <br />
                  <select class="form-select" aria-label="Default select example" onChange={this.handleConsultantChange}>
                    <option selected>Open this select menu</option>
                    {
                      this.state.consultants.map((consultant,key) => <option value={key}>{consultant.id} - {consultant.name}</option>)
                    }
                  </select>
                  <br />
                  <div className="form-group">
                    <label>Consultant Id</label>
                    <input type="text" defaultValue={modalBooking.consultantId} name="consultantId" className="form-control" id="consultantId" placeholder="Enter Consultant Id" disabled/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Consultant Name</label>
                    <input type="text" defaultValue={modalBooking.consultantName} name="consultantName" className="form-control" id="nameModal" placeholder="Enter Consultant Name" disabled/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Expertise</label>
                    <input type="text" defaultValue={modalBooking.expertise} name="expertise" className="form-control" id="nameModal" placeholder="Enter Expertise" disabled/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Consultant Image</label>
                    <input type="text" defaultValue={modalBooking.consultantImage} name="consultantImage" className="form-control" id="nameModal" placeholder="Enter Consultant Image" disabled/>
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
          { Object.keys(expandedBooking).length !== 0 &&
          <div id="fabricShopDetails" className="fabricShopDetails col-5 p-0">
            <div class="container m-0 p-0">
              <div class="card user-card">
                <div class="card-block">
                  <h5 style={{textAlign:'left', marginLeft:'4%'}}>Consultant Details</h5>
                  <br />
                  <div className="row">
                    <div className="col-5">
                      <div class="user-image">
                          <img src={expandedBooking.consultantImage ? expandedBooking.consultantImage : "https://p.kindpng.com/picc/s/78-785975_icon-profile-bio-avatar-person-symbol-chat-icon.png"} class="img-radius" alt="User-Profile-Image" />
                      </div>
                    </div>
                    <div className="col-7 align-left" style={{fontSize:18}}>
                      <h6 class="f-w-600 m-t-25" style={{fontSize:20, marginBottom:7}}>{expandedBooking.consultantName}</h6>
                      <div className="m-t-10">{expandedBooking.consultantId && "ID : "}{expandedBooking.consultantId}</div>
                      <div className="m-t-10">{expandedBooking.expertise && "Expertise : "}{expandedBooking.expertise}</div>
                    </div>
                  </div>
                  <br />
                  <hr />
                  <br />
                  <h5 style={{textAlign:'left' , marginLeft:'4%'}}>Booking Details</h5>
                
                  <div style={{fontWeight:400, fontSize:17, textAlign:'left', margin:'5% 5% 2% 5%'}}>
                    <div className="m-t-10">{expandedBooking.userId && "Booking Id : "}&nbsp;&nbsp;{expandedBooking.bookingId}</div>
                    <div className="m-t-10">{expandedBooking.userId && "User Contact  : "}&nbsp;&nbsp;{expandedBooking.userId}</div>
                    <div className="m-t-10">{expandedBooking.bookingDate && "Booking Date : "}&nbsp;&nbsp;{expandedBooking.bookingDate}</div>
                    <div className="m-t-10">{expandedBooking.bookingTime && "Booking Time : "}&nbsp;&nbsp;{expandedBooking.bookingTime}</div>
                    <div className="m-t-10">{expandedBooking.orderDate && "Order Date : "}&nbsp;&nbsp;{expandedBooking.orderDate}</div>
                    <div className="m-t-10">{expandedBooking.paymentId && "Payment ID : "}&nbsp;&nbsp;{expandedBooking.paymentId}</div>
                  </div>
                  <br />
                  <p class="text m-t-15" style={{fontSize:20, fontWeight:600}}>{expandedBooking.amount && "Amount : Rs. "} {expandedBooking.amount}</p>
                  {/*<hr/>
                  <p class="m-t-15 text" style={{fontWeight:500, fontSize:18}}>Specializations</p>
                  
                  <br />
                  <p class="text m-t-15" style={{fontWeight:500 , fontSize:18}}> Fabric Samples</p> */}
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

export default ConsultantBooking;
