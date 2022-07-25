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
    searchText: "",
    expandedBooking:{
    }
  };

  api_url = "https://us-central1-masterji-online.cloudfunctions.net/app/";

  componentDidMount() {
    fetch(this.api_url+"consultantbooking/v2/get")
      .then((response) => response.json())
      .then((bookings) => {
        console.log(bookings);
        this.setState({ bookings });
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
    console.log(modalFields.booking)
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
                    <label>Shop Name</label>
                    <input type="text" defaultValue={modalBooking.shopName} name="shopName" className="form-control" id="shopNameModal" onChange={this.handleChange} placeholder="Enter Name"/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Owner's Name</label>
                    <input type="text" defaultValue={modalBooking.name} name="name" className="form-control" id="nameModal" onChange={this.handleChange} placeholder="Enter Owner's Name"/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Shop Variety</label>
                    <input type="text" defaultValue={modalBooking.shopVariety} name="shopVariety" className="form-control" id="nameModal" onChange={this.handleChange} placeholder="Enter Shop Variety"/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>City</label>
                    <input type="text" defaultValue={modalBooking.city} name="city" className="form-control" id="nameModal" onChange={this.handleChange} placeholder="Enter City"/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Address</label>
                    <input type="text" defaultValue={modalBooking.address} name="address" className="form-control" id="nameModal" onChange={this.handleChange} placeholder="Enter Address"/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Contact</label>
                    <input type="text" defaultValue={modalBooking.contact} name="contact" className="form-control" id="nameModal" onChange={this.handleChange} placeholder="Enter Contact"/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Specializations</label>
                    <input type="text" onChange={this.handleChange} name="specialisation" className="form-control" id="specialisation" placeholder="Enter Specialisation separated by semicolon"/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>User Image</label>
                    <input type="text" defaultValue={modalBooking.userImage} name="userImage" className="form-control" id="nameModal" onChange={this.handleChange} placeholder="Enter User Image"/>
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
                    <div className="m-t-10">{expandedBooking.userId && "User Contact  : "}&nbsp;&nbsp;{expandedBooking.userId}</div>
                    <div className="m-t-10">{expandedBooking.bookingDate && "Booking Date : "}&nbsp;&nbsp;{expandedBooking.bookingDate}</div>
                    <div className="m-t-10">{expandedBooking.bookingTime && "Booking Time : "}&nbsp;&nbsp;{expandedBooking.bookingTime}</div>
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
