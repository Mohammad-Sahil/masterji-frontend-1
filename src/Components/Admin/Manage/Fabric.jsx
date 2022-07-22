import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SearchBar from "./searchBar";
import "./fabricShop.css";
import "./table.css";
import Metadata from "../../Metadata";
class Fabric extends Component {
  state = {
    shops: [
      // {
      //   id:'123',
      //   name:'Daya Govinda',
      //   userImage:'https://previews.123rf.com/images/lenblr/lenblr1711/lenblr171100286/90105209-row-of-autumn-coats-hanging-on-rack-shopping-cloth-shop-clothing-store-female-collection-in-fashion-.jpg',
      //   shopName:'Govinda collections',
      //   shopVariety:'Fabric',
      //   address:'Sevoy complex gulmohar shop no. D6B',
      //   city:'Kalyan',
      //   contact:'777000000',
      //   created:'Fri Jul 09 2021 00:06:48 GMT+0530 (India Standard Time)',
      //   specialisation:['fall','sew','design','shirt','pant','saree'],
      //   fabricSamples:[]
      // },
      // {
      //   id:'456',
      //   name:'Amit Bhatia',
      //   userImage:'https://img2023.weyesimg.com/uploads/ouyeedisplays.allweyes.com/images/15350800708698.jpg?imageView2/2/w/1920/q/75',
      //   shopName:'Amir Collections',
      //   shopVariety:'Suits',
      //   address:'Gulmohar complex, Sevoy complex gulmohar shop no. D6B',
      //   city:'Banglore',
      //   contact:'8808080808',
      //   created:'Fri Jul 09 2021 00:06:48 GMT+0530 (India Standard Time)',
      //   specialisation:['shirt','pant','saree'],
      //   fabricSamples:[]
      // }
    ],
    showModal: false,
    modalFields: {
      operation: "Create",
      shop: {},
    },
    searchText: "",
    expandedShop:{
    }
  };

  api_url = "https://us-central1-masterji-online.cloudfunctions.net/app/";

  componentDidMount() {
    fetch(this.api_url+"fabricShops/v2/get")
      .then((response) => response.json())
      .then((shops) => {
        console.log(shops);
        this.setState({ shops });
      })
      .catch(err => toast.error(err.message));
  }

  handleModal(shop, operation) {
    this.setState({ showModal: !this.state.showModal });
    let modalFields = {
      operation,
      shop,
    };
    this.setState({ modalFields });
  }

  handleChange = (e) => {
    let modalFields = this.state.modalFields;
    modalFields.shop[e.currentTarget.name] = e.currentTarget.value;
    console.log(modalFields.shop)
    this.setState({ modalFields });
  };

  handleSpecialisationsChange = (e) => {
    let modalFields = this.state.modalFields;
    let specialisations = e.currentTarget.value.split(';');
    modalFields.shop.specialisation = specialisations;
  };

  getSpecilisationString = specialisations => {
    if(!specialisations)
      return "";
    let specilisationString = "";
    for (let i = 0; i < specialisations.length; i++) {
      specilisationString += specialisations[i];
      if(i !== specialisations.length-1)
        specilisationString += ';';
    }
    return specilisationString;
  }

  handleCreate = (e) => {
    e.preventDefault();
    const shop = this.state.modalFields.shop;
    fetch(this.api_url + "fabricShops/v2/post", {
        method:"POST",
        body:JSON.stringify({...shop}),
        headers:{"Content-Type" : "application/json"}
    })
    .then(response => response.json())
    .then((data) => {
        console.log(data);
        const shops = [data.data, ...this.state.shops];
        toast.success(data.message);
        this.setState({ shops, showModal:false  });
    })
    .catch(err => toast.error(err));
    
  };

  handleUpdate = (e) => {
    e.preventDefault();
    const shop = this.state.modalFields.shop;
      fetch(this.api_url + "fabricShops/v2/put/" + shop.id, {
          method:"PUT",
          body:JSON.stringify({...shop}),
          headers:{"Content-Type" : "application/json"}
      })
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        const shops = [...this.state.shops];
        const index = shops.indexOf(shop);
        shops[index] = { ...data.data };
        toast.success(data.message);
        this.setState({ shops, showModal:false });
      })
      .catch(err => toast.error(err));
  };

  handleDelete = (shop) => {

    fetch(this.api_url + "fabricshops/v2/delete/" + shop.id,{
            method:"DELETE"
        })
        .then(response => response.json())
        .then((data)=>{
            console.log(data);
            const shops = this.state.shops.filter(
              (c) => c.id !== shop.id
            );
            toast.success(data.message);
            this.setState({ shops });
        })
        .catch(err => toast.error(err));

   
  };

  search = (searchText) => {
    console.log(searchText);
    this.setState({ searchText });
  };

  expandShop = shop => {
    this.setState({expandedShop:shop})
  }

  

  render() {
    const { shops, searchText, expandedShop } = this.state;
    const modalShop = this.state.modalFields.shop;
    let filteredShops = shops;
    filteredShops = filteredShops.filter((shop) => {
      for (let property in shop) {
        if (typeof shop[property] === 'string' && shop[property].toLowerCase().includes(searchText.toLowerCase())) return true;
      }
      return false;
    });
    return (
      <>
      <Metadata title='Fabric Shops | Admin | Masterji'/>
      <div>
      <ToastContainer/>

        <div className="fashionConsultantContainer row gx-0" style={Object.keys(expandedShop).length === 0 ? {marginRight:50}:{}}>
          <div id="fabricShopTable" className={ Object.keys(expandedShop).length === 0 ? "fabricShopTable" : "fabricShopTable col-6"}>
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
                    <th scope="col">Shop Name</th>
                    <th scope="col">Owner</th>
                    <th scope="col">Contact</th>
                    <th scope="col">City</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredShops.map((shop) => (
                    <tr key={shop.id} onClick={() => this.expandShop(shop)} style={expandedShop.id === shop.id ? {backgroundColor:'#ffa', cursor:'pointer'} : {cursor:'pointer'}}>
                      <td>{shop.shopName}</td>
                      <td>{shop.name}</td>
                      <td>{shop.contact}</td>
                      <td>{shop.city}</td>
                      <td>
                        <button className="btn-warning editButton" onClick={() =>this.handleModal(shop, "Update")}>
                          <i class="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                      </td>
                      <td>
                        <button className="btn-danger deleteButton" onClick={() => this.handleDelete(shop)}>
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
                {this.state.modalFields.operation} Shop
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
                    <input type="text" defaultValue={modalShop.shopName} name="shopName" className="form-control" id="shopNameModal" onChange={this.handleChange} placeholder="Enter Name"/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Owner's Name</label>
                    <input type="text" defaultValue={modalShop.name} name="name" className="form-control" id="nameModal" onChange={this.handleChange} placeholder="Enter Owner's Name"/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Shop Variety</label>
                    <input type="text" defaultValue={modalShop.shopVariety} name="shopVariety" className="form-control" id="nameModal" onChange={this.handleChange} placeholder="Enter Shop Variety"/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>City</label>
                    <input type="text" defaultValue={modalShop.city} name="city" className="form-control" id="nameModal" onChange={this.handleChange} placeholder="Enter City"/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Address</label>
                    <input type="text" defaultValue={modalShop.address} name="address" className="form-control" id="nameModal" onChange={this.handleChange} placeholder="Enter Address"/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Contact</label>
                    <input type="text" defaultValue={modalShop.contact} name="contact" className="form-control" id="nameModal" onChange={this.handleChange} placeholder="Enter Contact"/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Specializations</label>
                    <input type="text" defaultValue={this.getSpecilisationString(modalShop.specialisation)} onChange={this.handleSpecialisationsChange} name="specialisation" className="form-control" id="specialisation" placeholder="Enter Specialisation separated by semicolon"/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>User Image</label>
                    <input type="text" defaultValue={modalShop.userImage} name="userImage" className="form-control" id="nameModal" onChange={this.handleChange} placeholder="Enter User Image"/>
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
          { Object.keys(expandedShop).length !== 0 &&
          <div id="fabricShopDetails" className="fabricShopDetails col-5 p-0">
            <div class="container m-0 p-0">
              <div class="card user-card">
                <div class="card-block">
                  <div className="row">
                    <div className="col-5">
                      <div class="user-image">
                          <img src={expandedShop.userImage ? expandedShop.userImage : "https://p.kindpng.com/picc/s/78-785975_icon-profile-bio-avatar-person-symbol-chat-icon.png"} class="img-radius" alt="User-Profile-Image" />
                      </div>
                    </div>
                    <div className="col-7 align-left">
                      <h6 class="f-w-600 m-t-25" style={{fontSize:20, marginBottom:5}}>{expandedShop.shopName}</h6>
                      <div className="m-t-10">{expandedShop.city && <i class="fa fa-building-o" aria-hidden="true"></i>}<span style={{fontSize:18}}>{expandedShop.city}</span></div>
                      <div className="m-t-10">{expandedShop.contact && <i class="fa fa-phone" style={{fontSize:18}} aria-hidden="true"></i>}&nbsp;&nbsp;{expandedShop.contact}</div>
                    </div>
                  </div>
                  <div style={{fontWeight:400, fontSize:17, textAlign:'left', margin:'3% 7%'}}>
                    <div class="text m-t-5">{expandedShop.shopVariety && "Variety "}&nbsp;&nbsp;{": "+expandedShop.shopVariety}</div>
                    <div class="text m-t-5">{expandedShop.city && 'Owner '}&nbsp;{" : "+expandedShop.name}</div>
                    <div class="text m-t-5">{expandedShop.address && 'Address'} {": "+expandedShop.address}</div>
                  </div>
                  <hr/>
                  <p class="m-t-15 text" style={{fontWeight:500, fontSize:18}}>Specializations</p>
                  <div class="specialization-grid-container">
                  {expandedShop.specialisation.map(sp => (
                    // <div className="m-t-5">{sp}</div>
                    <div class="badge badge-primary">{sp}</div>

                  ))}
                  </div>
                  
                  <br />
                  <p class="text m-t-15" style={{fontWeight:500 , fontSize:18}}> Fabric Samples</p>
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

export default Fabric;
