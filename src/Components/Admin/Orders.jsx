import React, { useEffect, useState } from "react";
import Metadata from "../Metadata";
import { Link } from "react-router-dom";
import axios from "axios";
import { Modal } from "react-bootstrap";
import './Orders.css'


const Orders = () => {
  const [tab, settab] = useState("New");
  const navdata = [
    {
      title: "New",
      cName: "nav-text",
      active: tab === "New" ? true : false,
    },
    {
      title: "Scheduled",
      cName: "nav-text",
      active: tab === "Scheduled" ? true : false,
    },
    {
      title: "Stiching",
      cName: "nav-text",
      active: tab === "Stiching" ? true : false,
    },
    {
      title: "Delivery",
      cName: "nav-text",
      active: tab === "Delivery" ? true : false,
    },
    {
      title: "All",
      cName: "nav-text",
      active: tab === "All" ? true : false,
    },
  ];
  const func = async () => {
    let { data } = await axios.get(
      "https://us-central1-masterji-online.cloudfunctions.net/app/orders/v2/get"
    );
    setOrderslist(data);
  };
  useEffect(() => {
    func();
  }, []);
  const [Orderslist, setOrderslist] = useState([]);
  const [expandedorder, setexpandedorder] = useState([]);
  const tabhandle = (e) => {
    e.preventDefault();
    settab(e.target.innerHTML);
  };

  const [showModal, setshowModal] = useState()
  const [modalFields, setmodalFields] = useState({

  })

  const handleChange = (e) => {
    ;
    console.log(modalFields.consultant)
    setmodalFields({...modalFields, [e.currentTarget.name] : e.currentTarget.value});
  };

  const handlesubmit = (e)=>{
    e.preventDefault()

  }
  return (
    <>
      <Metadata title="Orders | Admin | Masterji" />

      <div>
        <nav className="main-nav">
          <div className={"menu-link mobile-menu-link"}>
            <ul>
              {navdata.map((item, index) => {
                return (
                  <li key={index}>
                    <Link
                      to=""
                      className={item.active && "active"}
                      onClick={tabhandle}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
        <div>
          <div
            className="OrderContainer row gx-0"
            style={
              Object.keys(expandedorder).length === 0 ? { marginRight: 50 } : {}
            }
          >
            <div
              style={{
                margin: "20px 20px 20px 30px",
                padding: "20px",
                borderRadius: "5px",
                backgroundColor: "white",
              }}
              className={
                Object.keys(expandedorder).length !== 0 &&
                "fashionConsultantTable col-5"
              }
            >
          <div className="row">
              <div className="col-3">
                <button
                  type="button"
                  className="btn btn-warning addButton"
                  style={{ width: '100%', color:'white' }}
                  onClick={() => setshowModal(!showModal)}
                >
                  Create Order
                </button>
              </div>
              <div className="col-10">
                {/* <SearchBar search={this.search} searchInput={searchText} /> */}
              </div>
            </div>
            <br />
              <div class="table-responsive tableDiv">
                <table className="table table-condensed">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Customer</th>
                      <th scope="col">Garments</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Orderslist.map((order) => (
                      <tr
                        key={order.id}
                        onClick={() => setexpandedorder(order)}
                        style={
                          expandedorder.id === order.id
                            ? { backgroundColor: "#ffa", cursor: "pointer" }
                            : { cursor: "pointer" }
                        }
                      >
                        <td>
                          UNNAMED
                          <div>{order.id}</div>
                        </td>
                        <td>
                          {order.RfOrderItem}
                          <div>{order.commentData}</div>
                        </td>
                        <td>
                          {order.currentStatus}
                          <div>Assign Executive</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Modal show={showModal}>
              <Modal.Header>
                 Consultant
              </Modal.Header>
              <Modal.Body>
                <form
                  onSubmit={handlesubmit}
                >
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text" name="name" className="form-control" id="nameModal" onChange={handleChange} placeholder="Enter Name"/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>City</label>
                    <input type="text" name="city" className="form-control" id="nameModal" onChange={handleChange} placeholder="Enter City"/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Contact</label>
                    <input type="text" name="contact" className="form-control" id="nameModal" onChange={handleChange} placeholder="Enter Contact"/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Email</label>
                    <input type="text" name="email" className="form-control" id="nameModal" onChange={handleChange} placeholder="Enter Email"/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Expertise</label>
                    <input type="text" name="expertise" className="form-control" id="nameModal" onChange={handleChange} placeholder="Enter Expertise"/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Work Experience</label>
                    <input type="text" name="workExperience" className="form-control" id="nameModal" onChange={handleChange} placeholder="Enter Work Experience"/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Price</label>
                    <input type="text" name="rate" className="form-control" id="nameModal" onChange={handleChange} placeholder="Enter Price"/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>User Image</label>
                    <input type="text" name="userImage" className="form-control" id="nameModal" onChange={handleChange} placeholder="Enter User Image"/>
                  </div>
                  <br />
                  <div style={{ float: "right" }}>
                    <span>
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </span>
                    <span>
                      <button type="button" className="btn btn-primary" onClick={() => setshowModal(false)}>
                        Close
                      </button>
                    </span>
                  </div>
                </form>
              </Modal.Body>
            </Modal>
            </div>
            {Object.keys(expandedorder).length !== 0 && (
              <div
                className="OrderDetail col-6 p-0"
                style={{
                  margin: "20px 10px 20px 10px",
                  "border-radius": "5px",
                }}
              >
                <div class="container m-0 p-0">
                  <div class="card user-card">
                    <div class="card-block">
                    <div className="section1">

                      <h6
                        class="f-w-600 m-t-25 m-b-10"
                        style={{ fontSize: 20 }}
                      >
                        UNNAMED
                      </h6>
                        <div style={{ fontWeight: 300, fontSize: 20 }}>
                          <span>
                          {expandedorder.currentStatus==='Canceled' ? 'CANCELED' : 'PLACED'}
                          </span>
                          <div className="when">
                            
                          <span>
                          When:
                          </span>
                          <span>
                          {expandedorder.orderDate}
                          </span>

                          </div>
                        </div>
                    </div>

                    <div className="section2">
                        <div className="head">
                            Customer Details
                        </div>
                        <div className="details">
                            <div className="mobile">
                                <div className="mobilehead">Mobile Number</div>
                                <div className="mobilenumber">{expandedorder.phoneNumber}</div>
                            </div>
                            <div className="orderid">
                                <div className="orderidhead">Order ID</div>
                                <div className="orderidvalue">{expandedorder.orderID}</div>
                            </div>
                            <div className="pickup">
                                <div className="pickuphead">Order ID</div>
                                <div className="pickupaddress">{expandedorder.address}</div>
                            </div>
                            <div className="preffered">
                                <div className="prefferedhead">Order ID</div>
                                <div className="prefferedvalue">{expandedorder.orderDate}</div>
                            </div>
                        </div>
                    </div>

                    <div className="section3">
                        <div className="garmentstitle">1 Garments</div>
                        <div className="item">{expandedorder.RfOrderItem}</div>
                    </div>
                    <div className="section4">
                        <div className="statushead">Status</div>
                        <div className="statuscontent">
                            <div className="bullet"></div>
                            <div className="statuscontext">
                                <div className="statustitle">Order Placed</div>
                                <div className="statusplaced">{expandedorder.orderDate}</div>
                            </div>
                        </div>
                    </div>

                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
