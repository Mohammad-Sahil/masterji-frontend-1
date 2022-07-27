import React, { useEffect, useState } from "react";
import Metadata from "../Metadata";
import { Link } from "react-router-dom";
import axios from "axios";
import { Modal } from "react-bootstrap";
import "./Orders.css";
import SearchBar from "./Manage/searchBar";
import { Switch } from "antd";

const Orders = () => {
  const [modal, setmodal] = useState('edit');
  const [check, setcheck] = useState({});
  const handlecheck = (data, sub) => {
    setcheck({
      ...check,
      [data.id]: {
        checked:
          sub === "main"
            ? !check[data.id]?.checked
            : check[data.id]?.checked !== undefined
            ? check[data.id]?.checked
            : false,
        stitch:
          sub === "switch"
            ? !check[data.id]?.stitch
            : check[data.id]?.stitch !== undefined
            ? check[data.id]?.stitch
            : true,
        data,
        ["data"]: {
          ...data,
          stitching_category: [
            {
              ...data?.stitching_category[0],
              category_details: [
                {
                  ...data?.stitching_category[0]?.category_details[0],
                  checked:
                    sub === 0
                      ? !check[data?.id]?.data?.stitching_category[0]
                          ?.category_details[0]?.checked
                      : sub === 1
                      ? false
                      : check[data?.id]?.data?.stitching_category[0]
                          ?.category_details[0]?.checked,
                },
                {
                  ...data?.stitching_category[0]?.category_details[1],
                  checked:
                    sub === 1
                      ? !check[data?.id]?.data?.stitching_category[0]
                          ?.category_details[1]?.checked
                      : sub === 0
                      ? false
                      : check[data?.id]?.data?.stitching_category[0]
                          ?.category_details[1]?.checked,
                },
              ],
            },
          ],
        },
      },
    });
  };

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
    let orders = await axios.get(
      "https://us-central1-masterji-19f75.cloudfunctions.net/app/orders/v2/get"
    );
    // let orders = await axios.get(
    //   "https://us-central1-masterji-online.cloudfunctions.net/app/orders/v2/get"
    // );
    setOrderslist(orders.data);
    setfiltered(orders.data);

    let garments = await axios.get(
      "https://us-central1-masterji-19f75.cloudfunctions.net/app/garments/v2/get"
    );
    setgarmentdatas(garments.data);
  };
  useEffect(() => {
    func();
  }, []);

  const [Orderslist, setOrderslist] = useState([]);
  const [garmentdatas, setgarmentdatas] = useState([]);
  const [expandedorder, setexpandedorder] = useState([]);
  const tabhandle = (e) => {
    e.preventDefault();
    settab(e.target.innerHTML);
  };

  const [showModal, setshowModal] = useState();
  const [showModalcancel, setshowModalcancel] = useState();

  const [modalFields, setmodalFields] = useState({});
  const [address, setaddress] = useState({});

  let RfOrderItem=[];
  const getitem = () => {
    if (check) {
      for (let garm in check) {
        if (check[garm]?.checked) {
          let data = {};
          data.garmentId = check[garm]?.data.id;
          data.stitching_category = [];
          data.workType = 0;
          data.pricing = {
            stitch_price:
              check[garm]?.data?.garment_details?.stitching_base_price,
            total_price: check[garm]?.stitch
              ? check[garm]?.data?.garment_details?.stitching_base_price
              : check[garm]?.data?.garment_details?.alteration_price,
            add_on_price: 0,
            alter_price: check[garm]?.data?.garment_details?.alteration_price,
          };
          data.garment_details = {
            garment_type: check[garm]?.data?.garment_details?.garment_type,
            icon: check[garm]?.data?.garment_details?.icon,
            category: check[garm]?.data?.category,
          };
          let tempdata = [];
          check[garm]?.data?.stitching_category[0].category_details.map(
            (elem) => {
              if(elem.checked){

                tempdata = [
                  ...tempdata,
                  {
                    category: check[garm]?.data?.stitching_category[0]?.category,
                    sub_category: elem.subcategory,
                    price: elem.price,
                  },
                ];
              }
            }
          );
          data.selected_category = [...tempdata];
          RfOrderItem = [...RfOrderItem, {...data}];
          return RfOrderItem
        }
      }
    }
  };
  

  const [searchText, setsearchText] = useState();
  const [filtered, setfiltered] = useState([]);

  const handleChange = (e) => {
    setmodalFields({
      ...modalFields,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleChangeaddress = (e) => {
    setaddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    getitem()
    console.log(RfOrderItem)
    await axios.post(
      "https://us-central1-masterji-online.cloudfunctions.net/app/orders/v2/post",
      { ...modalFields, address, RfOrderItem },
      { headers: { "Content-Type": "application/json" } }
    );
  };

  const [cancelReason, setcancelReason] = useState("");

  const handlecancel = async (e) => {
    e.preventDefault();
    const data = {
      cancelReason,
      currentStatus: "CANCELED",
    };
    await axios.put(
      `https://us-central1-masterji-online.cloudfunctions.net/app/orders/v2/put/${expandedorder.id}`,
      data
    );
    setshowModalcancel(false);
    func();
  };

  useEffect(() => {
    setfiltered(
      Orderslist.filter((order) => {
        for (let property in order) {
          if (
            typeof order[property] === "string" &&
            order[property]?.toLowerCase().includes(searchText?.toLowerCase())
          )
            return true;
        }
        return false;
      })
    );
  }, [searchText]);

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
                    style={{ width: "100%", color: "white" }}
                    onClick={() =>{setmodal('create');setshowModal(!showModal)}}
                  >
                    Create Order
                  </button>
                </div>
                <div className="col-9">
                  <SearchBar
                    search={(v) => setsearchText(v)}
                    searchInput={searchText}
                  />
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
                    {filtered.map((order) => {
                      {/* console.log(order) */}
                      return(  <tr
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
                          {order.RfOrderItem[0]?.garment_details.garment_type}
                          <div>{order.RfOrderItem[0]?.pricing.total_price===order.RfOrderItem[0]?.pricing.alter_price ? 'alter' : 'stitch'}</div>
                        </td>
                        <td>
                          {order.currentStatus}
                          <div>Assign Executive</div>
                        </td>
                      </tr>)
                    })}
                  </tbody>
                </table>
              </div>
              <Modal dialogClassName="ordermodal" show={showModal}>
                <Modal.Header>Create Order</Modal.Header>
                <Modal.Body>
                  <form onSubmit={handleCreate}>
                    <div className="form-group">
                      <label>Customer Mobile Number</label>
                      <input
                        type="text"
                        name="phoneNumber"
                        className="form-control"
                        id="nameModal"
                        onChange={handleChange}
                        placeholder="Mobile Number"
                        value={modalFields.phoneNumber}
                      />
                    </div>
                    <br />
                    <div className="form-group">
                      <label>Customer Details</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        id="nameModal"
                        value={modalFields.name}
                        onChange={handleChange}
                        placeholder="Customer Name"
                      />
                      <br />
                      <input
                        type="text"
                        name="houseNo"
                        className="form-control"
                        id="nameModal"
                        value={address.houseNo}
                        onChange={handleChangeaddress}
                        placeholder="House no./ Flat no."
                      />
                      <br />
                      <input
                        type="text"
                        name="building"
                        className="form-control"
                        id="nameModal"
                        value={address.building}
                        onChange={handleChangeaddress}
                        placeholder="Street / Building"
                      />
                      <br />
                      <input
                        type="text"
                        name="landmark"
                        className="form-control"
                        id="nameModal"
                        value={address.landmark}
                        onChange={handleChangeaddress}
                        placeholder="Area / Locality / Landmark"
                      />
                      <br />
                      <input
                        type="text"
                        name="city"
                        className="form-control"
                        id="nameModal"
                        value={address.city}
                        onChange={handleChangeaddress}
                        placeholder="City"
                      />
                    </div>
                    <br />
                    {modal==='create' && <>

                    <div className="form-group modalitem">
                      <label>Select garments for stitching or alteration</label>
                      <br />
                      <table className="table table-condensed">
                        <thead className="thead-dark">
                          <tr>
                            <th scope="col">Garment</th>
                            <th scope="col">Select Action</th>
                            <th scope="col">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {garmentdatas.map((garment) => {
                            return (
                              <>
                                <tr key={garment.id}>
                                  <td>
                                    <input
                                      type="checkbox"
                                      checked={check[garment.id]?.checked}
                                      onClick={() =>
                                        handlecheck(garment, "main")
                                      }
                                      name={garment.id}
                                      style={{ cursor: "pointer" }}
                                    />
                                    <span className="garmentname">
                                      {garment.garment_details.garment_type} (
                                      {garment.city})
                                    </span>
                                    <div className="design">
                                      {garment.stitching_category[0]?.category_details?.map(
                                        (elem, index) => {
                                          return (
                                            <>
                                              <input
                                                type="checkbox"
                                                name="stitching_category"
                                                value={elem.subcategory}
                                                key={elem.subcategory}
                                                onClick={() =>
                                                  handlecheck(garment, index)
                                                }
                                                checked={
                                                  check[garment.id]?.data
                                                    ?.stitching_category[0]
                                                    ?.category_details[index]
                                                    ?.checked
                                                }
                                                disabled={
                                                  check[garment.id]?.checked
                                                    ? false
                                                    : true
                                                }
                                                style={
                                                  check[garment.id]?.checked
                                                    ? { cursor: "pointer" }
                                                    : {}
                                                }
                                              />
                                              <span className="garmentname">
                                                {elem.subcategory}
                                                {`-  ₹ `}
                                                {elem.price}
                                              </span>
                                              <br />
                                            </>
                                          );
                                        }
                                      )}
                                    </div>
                                  </td>
                                  <td>
                                    <span className="garmentaction">
                                      Alter{" "}
                                      <Switch
                                        disabled={
                                          check[garment.id]?.checked
                                            ? false
                                            : true
                                        }
                                        checked={check[garment.id]?.stitch}
                                        onClick={() =>
                                          handlecheck(garment, "switch")
                                        }
                                      />{" "}
                                      Stitch
                                    </span>
                                  </td>
                                  <td>
                                    <div className="priceborder">
                                      <div>
                                        Alter : ₹{" "}
                                        {
                                          garment.garment_details
                                            .alteration_price
                                        }
                                      </div>
                                      <div>
                                        Stitch : ₹{" "}
                                        {
                                          garment.garment_details
                                            .stitching_base_price
                                        }
                                      </div>
                                    </div>
                                  </td>

                                  <br />
                                </tr>
                              </>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    </> }
                    <div className="form-group">
                      <label>Discount</label>
                      <input
                        type="text"
                        name="percentdiscount"
                        className="form-control"
                        id="nameModal"
                        onChange={handleChange}
                        placeholder="Enter % discount"
                      />
                      <br />
                      <input
                        type="text"
                        name="flatdiscount"
                        className="form-control"
                        id="nameModal"
                        onChange={handleChange}
                        placeholder="Enter flat discount"
                      />
                      <br />
                      <input
                        type="text"
                        name="commentData"
                        className="form-control"
                        id="nameModal"
                        onChange={handleChange}
                        placeholder="Enter Comment"
                      />
                    </div>
                    <br />
                    <div className="form-group">
                      <label>Preffered Pickup Date and Time</label>
                      <input
                        type="date"
                        name="bookingDate"
                        className="form-control"
                        id="nameModal"
                        onChange={handleChange}
                        placeholder=""
                      />
                      <br />
                      <select
                        type="text"
                        name="bookingTime"
                        className="form-control"
                        id="nameModal"
                        onChange={handleChange}
                      >
                        <option value="" selected disabled hidden>
                          Select Time Slot
                        </option>
                        <option>9am - 10am</option>
                        <option>10am - 11am</option>
                        <option>11am - 12pm</option>
                        <option>12pm - 1pm</option>
                        <option>1pm - 2pm</option>
                        <option>2pm - 3pm</option>
                        <option>3pm - 4pm</option>
                        <option>4pm - 5pm</option>
                        <option>5pm - 6pm</option>
                      </select>
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
                          onClick={() => {setmodalFields({});setaddress({});setcheck({});setshowModal(false)}}
                        >
                          Close
                        </button>
                      </span>
                    </div>
                  </form>
                </Modal.Body>
              </Modal>
              <Modal show={showModalcancel}>
                <Modal.Body>
                  <form onSubmit={handlecancel}>
                    <div className="form-group">
                      <label>Provide a Reason</label>
                      <input
                        type="text"
                        name="cancelReason"
                        className="form-control"
                        id="nameModal"
                        onChange={(e) => setcancelReason(e.target.value)}
                        placeholder="Reason"
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
                          onClick={() => {setmodalFields({});setaddress({});setcheck({});setshowModalcancel(false)}}
                        >
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
                      <div className="row" style={{ width: "100%" }}>
                        <div className="col-4"></div>
                        <div className="col-3">
                          <button
                            type="button"
                            className="btn btn-warning addButton"
                            style={{ width: "100%", color: "white" }}
                            onClick={() => setshowModalcancel(!showModalcancel)}
                          >
                            Cancel Order
                          </button>
                        </div>
                        <div className="col-2">
                          <button
                            type="button"
                            className="btn btn-warning addButton"
                            style={{ width: "100%", color: "white" }}
                            onClick={() => {
                              setmodal('edit');
                              setmodalFields(expandedorder);
                              setshowModal(!showModal);
                            }}
                          >
                            Edit
                          </button>
                        </div>
                        <div className="col-3">
                          <button
                            type="button"
                            className="btn btn-warning addButton"
                            style={{ width: "100%", color: "white" }}
                            // onClick={() => setshowModal(!showModal)}
                          >
                            Assign Executive
                          </button>
                        </div>
                      </div>
                      <br />
                      <div className="section1">
                        <h6
                          class="f-w-600 m-t-25 m-b-10"
                          style={{ fontSize: 20 }}
                        >
                          UNNAMED
                        </h6>
                        <div>
                          <span className={expandedorder.currentStatus==='CANCELLED' && 'CANCELLED'}>{expandedorder.currentStatus}</span>
                          <div className="when">
                            <span className="text">When:</span>
                            <span className="date">
                              {new Date(expandedorder.orderDate).toDateString()}{' , '}
                              {expandedorder.bookingTime}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="section2">
                        <div className="head">Customer Details</div>
                        <div className="details">
                          <div className="mobile">
                            <div className="head">Mobile Number</div>
                            <div className="vaue">
                              {expandedorder.phoneNumber}
                            </div>
                          </div>
                          <div className="orderid">
                            <div className="head">Order ID</div>
                            <div className="value">{expandedorder.orderID}</div>
                          </div>
                          <div className="pickup">
                            <div className="head">Pricing</div>
                            <div className="value">200</div>
                          </div>
                          <div className="pricing">
                            <div className="head">Pickup Address</div>
                            <div className="value">{expandedorder.address.address}</div>
                          </div>
                          <div className="prefferedpickup">
                            <div className="head">Preffered Pickup</div>
                            <div className="value">
                              {new Date(expandedorder.bookingDate).toDateString()}
                              <br />
                              {expandedorder.bookingTime}
                            </div>
                          </div>
                          <div className="comments">
                            <div className="head">Comments</div>
                            <div className="value">
                              {expandedorder.commentData}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="section3">
                        <div className="head">1 Garments</div>
                        {expandedorder.RfOrderItem.map(elem=>{
                          return(
                    <span className="item">{elem.garment_details.garment_type}{' : ₹'}{elem.pricing.total_price}</span>
                          )
                        })}
                      </div>
                      <div className="section4">
                        <div className="head">Status</div>
                        <div className="statuscontent">
                          <div className="bullet">
                            <i class="fa-solid fa-circle"></i>
                          </div>
                          <div className="statuscontext">
                            <div className="statustitle">Order Placed</div>
                            <div className="statusplaced">
                              {new Date(expandedorder.orderDate).toDateString()}
                            </div>
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
