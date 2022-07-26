import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import "../Manage/fashionConsultant.css";
import "../Manage/table.css";
import Metadata from "../../Metadata";
import "./PortalUsers.css";
import SearchBar from "../Manage/searchBar";
import axios from "axios";
import { useSelector } from "react-redux";


const PortalUsers = () => {
  // const {user:You} = useSelector(state=>state.User)
  const You = {id:'1l5tqbk5f'}
  const func = async ()=>{
    const {data} = await axios.get('https://us-central1-masterji-online.cloudfunctions.net/app/auth/v2/get')
    setfiltered(data)
    setuserslist(data)
  }
  useEffect(() => {
    func()
  }, [])
  
  const [showModal, setshowModal] = useState()
  const [showModaldelete, setshowModaldelete] = useState()
  const [searchText, setsearchText] = useState()
  const [showModalcancel, setshowModalcancel] = useState()
  const [expandedusers, setexpandedusers] = useState([])
  const [filtered, setfiltered] = useState([])
  const [userslist, setuserslist] = useState([])
  const [modalFields, setmodalFields] = useState({})
  const handleCreate = ()=>{}
  const handleChange = (e) => {
    setmodalFields({
      ...modalFields,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  const handleupdate = async(e)=>{
    e.preventDefault()
    const data = {
      name:modalFields.name,
      email:modalFields.email,
      role:modalFields.role
    }
    const okk = await axios.put(`https://us-central1-masterji-online.cloudfunctions.net/app/auth/v2/put/${modalFields.id}`,data)
    setshowModal(false)
    func()
  }
  
  const handledelete = async (e)=>{
    e.preventDefault()
    await axios.delete(`https://us-central1-masterji-online.cloudfunctions.net/app/auth/v2/delete/${modalFields.id}`)
    setshowModaldelete(false)
    func()
  }

  useEffect(() => {
    setfiltered(
      userslist.filter((user) => {
        for (let property in user) {
          if (
            typeof user[property] === "string" &&
            user[property]?.toLowerCase().includes(searchText?.toLowerCase())
          )
            return true;
        }
        return false;
      })
    );
  }, [searchText]);

  return (
    <>
      <Metadata title="Portal Users | Admin | Masterji" />
      <div
              style={{
                margin: "20px 20px 20px 30px",
                padding: "20px",
                buserRadius: "5px",
                backgroundColor: "white",
              }}
              className={
                Object.keys(expandedusers).length !== 0 &&
                "fashionConsultantTable col-5"
              }
            >
              <div className="row">
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
                      <th scope="col">Id</th>
                      <th scope="col">Email</th>
                      <th scope="col">Name</th>
                      <th scope="col">Role</th>
                      <th scope="col">Created At</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.email}</td>
                        <td>{user.name}</td>
                        <td>{user.role}</td>
                        <td>{(new Date(user.createdAt._seconds*1000)).toLocaleDateString()}</td>
                        <td>
                        {You.id!==user.id && <>

                        <button className="btn-warning editButton" onClick={() =>{setmodalFields(user);setshowModal(!showModal)}}>
                          <i class="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                        </> }
                      </td>
                      <td>
                        {You.id!==user.id && <>
                        <button className="btn-danger deleteButton" onClick={() => {setmodalFields(user);setshowModaldelete(!showModaldelete)}}>
                          <i class="fa fa-trash-o"></i>
                        </button>
                        </> }
                      </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Modal show={showModal}>
                <Modal.Header>Consultant</Modal.Header>
                <Modal.Body>
                  <form onSubmit={modalFields.id ? handleupdate : handleCreate}>
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        id="nameModal"
                        onChange={handleChange}
                        placeholder="Name"
                        value={modalFields.name}
                      />
                    </div>
                    <br />
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="text"
                        name="email"
                        className="form-control"
                        id="nameModal"
                        onChange={handleChange}
                        placeholder="Email"
                        value={modalFields.email}
                      />
                    </div>
                    <br />
                    <div className="form-group">
                      <label>Role</label>
                      <br />
                      <select
                  type="text"
                  class="input"
                  name="role"
                  value={modalFields.role}
                  onChange={handleChange}>
                  <option value="" disabled selected>Role</option>
                  <option>Admin</option>
                  <option>Developer</option>
                  <option>Analyser</option>
                  <option>Manager</option>
                  <option>User Manager</option>
                  <option>Sales</option>
                  <option>Customer</option>
                  <option>Booking Manager</option>
                  <option>Fabric Sourcing</option>
                  <option>Fashion Consultant</option>
                  <option>Tailor</option>
                  <option>Delivery Partner</option>
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
                          onClick={() => setshowModal(false)}
                        >
                          Close
                        </button>
                      </span>
                    </div>
                  </form>
                </Modal.Body>
              </Modal>
              <Modal show={showModaldelete}>
                    <Modal.Body>
                        <form onSubmit={handledelete}>
                        <div className="form-group">
                        <b>

                      <label>Are You Sure You want to delete this User?</label>
                        </b>
                    </div>
                    <br />
                      <label>Email : {modalFields.email}</label>
                    <br />
                      <label>Name : {modalFields.name}</label>
                    <br />
                      <label>Role : {modalFields.role}</label>
                    <br />
                    <div style={{ float: "right" }}>
                      <span>
                        <button type="submit" className="btn btn-primary">
                          Yes
                        </button>
                      </span>
                      <span>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => setshowModaldelete(false)}
                        >
                          No
                        </button>
                      </span>
                    </div>
                        </form>
                    </Modal.Body>
              </Modal>
            </div>
    </>
  );
};

export default PortalUsers;
