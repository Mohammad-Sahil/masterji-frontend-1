import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Collapsible from 'react-collapsible';

import SearchBar from "./searchBar";
import "./fabricShop.css";
import "./table.css";
import Metadata from "../../Metadata";

const stitching_category = [
  {
      category_details: [
          {
              design: [],
              price: 80,
              subcategory: "Design"
          },
          {
              design: [],
              subcategory: "lining",
              price: 150
          }
      ],
      category: "Pant Stitching"
  }
]

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
    showCategoryModal: false,
    category: "",
    modalFields: {
      operation: "Create",
      shop: {},
    },
    modalFields2: {
      operation: "Create",
      shop: {},
    },
    searchText: "",
    expandedShop:{
    }
  };

  api_url = "https://us-central1-masterji-19f75.cloudfunctions.net/app/";

  componentDidMount() {
    fetch(this.api_url+"garments/v2/get")
      .then((response) => response.json())
      .then((shops) => {
        console.log(shops);
        this.setState({ shops });
      })
      .catch(err => toast.error(err.message));
  }
  componentDidUpdate(){
    fetch(this.api_url+"garments/v2/get")
      .then((response) => response.json())
      .then((shops) => {
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
  handleCategoryModal(shop, operation) {
    this.setState({ showCategoryModal: !this.state.showCategoryModal });
    let modalFields2 = {
      operation,
      shop,
    };
    this.setState({ modalFields2 });
  }

  handleChange = (e) => {
    let modalFields = this.state.modalFields;
    modalFields.shop[e.currentTarget.name] = e.currentTarget.value;
    console.log(modalFields.shop)
    this.setState({ modalFields });
  };
  handleChange2 = (e) => {
    let modalFields2 = this.state.modalFields2;
    modalFields2.shop[e.currentTarget.name] = e.currentTarget.value;
    console.log(modalFields2.shop)
    this.setState({ modalFields2 });
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
    // const shop = this.state.modalFields.shop;
    const { alteration, city, garment, stitching, stitchingProcess } = this.state.modalFields.shop;
    console.log(this.state.category)
    fetch(this.api_url + "garments/v2/post", {
        method:"POST",
        body:JSON.stringify({
          stitching_category: [],
          category: this.state.category,
          garment_details: {
              stitching_process: stitchingProcess,
              alteration_price: alteration,
              garment_type: garment,
              icon: "https://firebasestorage.googleapis.com/v0/b/masterji-19f75.appspot.com/o/GarmentCategory%2Ficon%2Flehnga_1645471363878?alt=media&token=c84c8d93-f6df-47a1-8977-ea391d8f83b8",
              stitching_base_price: stitching,
              design: {
                  back_design: [],
                  general_design: [],
                  side_design: [],
                  front_design: []
              }
          },
          city: city
      }),
        headers:{"Content-Type" : "application/json"}
    })
    .then(response => response.json())
    .then((data) => {
        console.log("This is shops>> ",data);
        const shops = [data.data, ...this.state.shops];
        toast.success(data.message);
        this.setState({ shops, showModal:false  });
    })
    .catch(err => toast.error(err));
    
  };

  handleUpdate = (e) => {
    e.preventDefault();
    const shop = this.state.modalFields.shop;
    const expandDetails = this.state.expandedShop;
    const { alteration, city, garment, stitching, stitchingProcess } = this.state.modalFields.shop;
      fetch(this.api_url + "garments/v2/put/" + shop.id, {
          method:"PUT",
          body:JSON.stringify({
            category: this.state.category,
            city: city || expandDetails.city,
            garment_details: {
              stitching_process: stitchingProcess || expandDetails.garment_details.stitching_process,
              alteration_price: alteration || expandDetails.garment_details.alteration_price,
              garment_type: garment || expandDetails.garment_details.garment_type,
              icon: "https://firebasestorage.googleapis.com/v0/b/masterji-19f75.appspot.com/o/GarmentCategory%2Ficon%2Flehnga_1645471363878?alt=media&token=c84c8d93-f6df-47a1-8977-ea391d8f83b8",
              stitching_base_price: stitching || expandDetails.garment_details.stitching_base_price,
              design: {
                  back_design: [],
                  general_design: [],
                  side_design: [],
                  front_design: []
              }
          }
          }),
          headers:{"Content-Type" : "application/json"}
      })
      .then(response => response.json())
      .then((data) => {
        console.log("this is the data we sent",data);
        const shops = [...this.state.shops];
        const index = shops.indexOf(shop);
        shops[index] = { ...data.data };
        toast.success(data.message);
        this.setState({ shops, showModal:false });
      })
      .catch(err => toast.error(err));
  };

  handleCategoryUpdate = (e) => {
    e.preventDefault();
    const { category, price1, price2, subcategory1, subcategory2} = this.state.modalFields2.shop;
      fetch(this.api_url + "garments/v2/put/" + this.state.expandedShop?.id, {
          method:"PUT",
          body:JSON.stringify({stitching_category: [{
                category_details: [
                    {
                        design: [],
                        price: price1,
                        subcategory: subcategory1
                    },
                    {
                        design: [],
                        subcategory: subcategory2,
                        price: price2
                    }
                ],
                category: category
            }]}),
          headers:{"Content-Type" : "application/json"}
      })
      .then(response => response.json())
      .then((data) => {
        console.log("this is the data we sent for handleCategoryUpdate >>> ", data);
        console.log("this is  data.data", data.data)
        const shops = this.state.expandedShop;
        this.setState({expandedShop: data.data});
        toast.success("Stitching Category updated successfully");
        this.setState({ ...shops, showCategoryModal:false });
      })
      .catch(err => toast.error(err));
  };
  
  handleCategoryUpdate2 = (e) => {
    e.preventDefault();
    const shop = this.state.modalFields2.shop;
      fetch(this.api_url + "garments/v2/put/" + this.state.expandedShop?.id, {
          method:"PUT",
          body:JSON.stringify({stitching_category: []}),
          headers:{"Content-Type" : "application/json"}
      })
      .then(response => response.json())
      .then((data) => {
        console.log("this is  data.data of delete>>.", data.data)
        const shops = this.state.expandedShop;
        this.setState({expandedShop: data.data})
        toast.success("Stitching Category deleted successfully");
        this.setState({ ...shops, showCategoryModal:false });
      })
      .catch(err => toast.error(err));
  };

  handleDelete = (shop) => {

    fetch(this.api_url + "garments/v2/delete/" + shop.id,{
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
        if (typeof shop.garment_details?.garment_type === 'string' && shop.garment_details?.garment_type.toLowerCase().includes(searchText.toLowerCase())) return true;
      }
      return false;
    });
    return (
      <>
      <Metadata title='Garments | Admin | Masterji'/>
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
                <SearchBar placeholder="Ex. Shirt" search={this.search} searchInput={searchText} />
              </div>
            </div>
            <br />
            <div className="table-responsive tableDiv">
              <table className="table table-condensed">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Garments</th>
                    <th scope="col">Stitch</th>
                    <th scope="col">Alter</th>
                    <th scope="col">City</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredShops.map((shop) => (
                    <tr key={shop.id} onClick={() => {
                        this.expandShop(shop)
                        this.setState({category: shop.category})
                      }} style={expandedShop.id === shop.id ? {backgroundColor:'#ffa', cursor:'pointer'} : {cursor:'pointer'}}>
                      <td className="text-capitalize">{shop.garment_details?.garment_type}</td>
                      <td>{shop.garment_details?.stitching_base_price}</td>
                      <td>{shop.garment_details?.alteration_price}</td>
                      <td className="text-capitalize">{shop.city}</td>
                      <td>
                        <button className="btn-warning editButton" onClick={() =>this.handleModal(shop, "Update")}>
                          <i className="fa fa-pencil" aria-hidden="true"></i>
                        </button>
                      </td>
                      <td>
                        <button className="btn-danger deleteButton" onClick={() => this.handleDelete(shop)}>
                          <i className="fa fa-trash-o"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal show={this.state.showModal}>
              <Modal.Header>
                {this.state.modalFields.operation} Garments
              </Modal.Header>
              <Modal.Body>
                <form
                  onSubmit={
                    this.state.modalFields.operation === "Update"
                      ? this.handleUpdate
                      : this.handleCreate
                  }
                >
                <div className="modelHeader d-flex align-items-center">
                <div className="col-4"><div className="garmentsModel d-flex align-items-center"><div className="d-flex justify-content-center align-items-center" style={{width:'30px',height:'30px',borderRadius: "50%", background: "#eee"}}>1</div>Garments details</div></div>
                <hr className="col-3"/>
                <div className="col-5 px-2" style={{marginLeft: "auto", marginRight: "0"}}><div className="garmentsModel d-flex align-items-center"><div className="d-flex justify-content-center align-items-center" style={{width:'30px',height:'30px',borderRadius: "50%", background: "#eee"}}>2</div>Garments samples</div></div>
                </div>
                <hr/>
              <div className="form-check">
                  <label className="form-check-label" onClick={() => this.setState({ category: "MALE" })}>
                  <input
                    checked={this.state.category === "MALE" ? true : false}
                    className="form-check-input radio-inline" type="radio" name="category" id="gridRadios1" value="MALE"/>
                  MALE</label>
                  <label onClick={() => this.setState({ category: "FEMALE" })}
                    className="form-check-label mx-5">
                  <input
                    checked={this.state.category === "FEMALE" ? true : false}
                    className="form-check-input radio-inline" type="radio" name="category" id="gridRadios2" value="FEMALE"/>
                  FEMALE</label>
              </div>
                  <br/>
                  <div className="form-group">
                    <label>City</label>
                    <input type="text" defaultValue={modalShop.city} name="city" className="form-control" id="shopNameModal" onChange={this.handleChange} placeholder="Enter City" required/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Alteration Price</label>
                    <input type="number" defaultValue={modalShop.garment_details?.alteration_price} name="alteration" className="form-control" id="nameModal" onChange={this.handleChange} placeholder="Enter Alteration Price" required/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Garment Type</label>
                    <input type="text" defaultValue={modalShop.garment_details?.garment_type} name="garment" className="form-control" id="nameModal" onChange={this.handleChange} placeholder="Enter Garment Type" required/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Stitching Base Price</label>
                    <input type="number" defaultValue={modalShop.garment_details?.stitching_base_price} name="stitching" className="form-control" id="nameModal" onChange={this.handleChange} placeholder="Enter Stitching Base Price" required/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Stitching Process</label>
                    <textarea defaultValue={modalShop.garment_details?.stitching_process} name="stitchingProcess" className="form-control" id="exampleFormControlTextarea1" onChange={this.handleChange} placeholder="Enter Stitching Process" required></textarea>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Icon Upload</label>
                    <input type="file" name="stitchingProcess" className="form-control" id="nameModal" placeholder="Upload Icon"/>
                  </div>
                  <br />
                  <div className="form-group">
                    <label>Back Design</label>
                    <input type="file" name="stitchingProcess" className="form-control" id="nameModal" placeholder="Upload Icon"/>
                    <label>Front Design</label>
                    <input type="file" name="stitchingProcess" className="form-control" id="nameModal" placeholder="Upload Icon"/>
                    <label>Back Design</label>
                    <input type="file" name="stitchingProcess" className="form-control" id="nameModal" placeholder="Upload Icon"/>
                    <label>Front Design</label>
                    <input type="file" name="stitchingProcess" className="form-control" id="nameModal" placeholder="Upload Icon"/>
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
            <div className="container m-0 p-0">
              <div className="card user-card">
                <div className="card-block">
                  <div className="row">
                    <div className="col-5">
                      <div className="user-image">
                          <img src={expandedShop.garment_details?.icon ? expandedShop.garment_details?.icon : "https://5.imimg.com/data5/RL/PY/MY-3431802/all-type-of-garments-500x500.jpg"} className="img-radius" alt="User-Profile-Image" />
                      </div>
                    </div>
                    <div className="col-7 align-left">
                      <h6 className="f-w-600 m-t-25 text-capitalize" style={{fontSize:20, marginBottom:5}}>{expandedShop.garment_details?.garment_type}</h6>
                      <div className="m-t-10 text-capitalize">{expandedShop.city && <i className="fa fa-building-o" aria-hidden="true"></i>}<span style={{fontSize:18}}>{expandedShop.city}</span></div>
                      <div className="m-t-10 text-capitalize">{expandedShop.category && <i className="fa fa-intersex" style={{fontSize:18}} aria-hidden="true"></i>}&nbsp;&nbsp;{expandedShop.category}</div>
                    </div>
                  </div>
                  <div style={{fontWeight:400, fontSize:17, textAlign:'left', margin:'5% 2%'}}>
                  <Collapsible trigger="Garment Details">
                    <div className="mx-1 my-2 row">
                    <div className="col">
                        <strong>Alteration</strong>
                        <p>₹ &nbsp;{expandedShop.garment_details?.alteration_price}</p>
                      </div>
                      <div className="col">
                        <strong>Stitching</strong>
                        <p>₹ &nbsp;{expandedShop.garment_details?.stitching_base_price}</p>
                      </div>
                      <div className="col">
                        <strong>City</strong>
                        <p className="text-capitalize">{expandedShop.city}</p>
                      </div>
                    </div>
                  </Collapsible><hr/>
                  <Collapsible trigger="Stitching Category">
                  <div className="my-2 d-flex justify-content-end">
                    <button className="btn btn-danger mx-2" onClick={this.handleCategoryUpdate2}>Delete</button>
                    <button className="btn btn-warning" onClick={() => this.handleCategoryModal({}, "Create")}>Create Category</button>
                  </div><hr/>
                  <div className="mx-3 my-2">
                    <div><p>Category: {expandedShop?.stitching_category[0]?.category}</p></div>
                    <div className="row mx-auto">
                      <div className="col-2"><img className="bg-danger" style={{height: "100%"}} src={expandedShop.stitching_category[0]?.category_details[0]?.design[0] ? expandedShop.stitching_category[0]?.category_details[0]?.design[0] : expandedShop.garment_details.icon} alt="DesignImg"/></div>
                      <div className="col-5">
                        <p className="m-0">Subcategory</p>
                        <strong>{expandedShop.stitching_category[0]?.category_details[0]?.subcategory}</strong>
                      </div>
                      <div className="col-5">
                        <p className="m-0">Price</p>
                        <strong>{expandedShop.stitching_category[0]?.category_details[0]?.price}</strong>
                      </div>
                    </div>
                  </div><hr/>
                  <div className="mx-3 my-2">
                    <div><p>Category: Lehnga</p></div>
                    <div className="row mx-auto">
                      <div className="col-2"><img src={expandedShop.stitching_category[0]?.category_details[1]?.design[0] ? expandedShop.stitching_category[0]?.category_details[1]?.design[0] : expandedShop.garment_details.icon} alt="DesignImg"/></div>
                      <div className="col-5">
                        <p className="m-0">Subcategory</p>
                        <strong>{expandedShop.stitching_category[0]?.category_details[1]?.subcategory}</strong>
                      </div>
                      <div className="col-5">
                        <p className="m-0">Price</p>
                        <strong>{expandedShop.stitching_category[0]?.category_details[1]?.price}</strong>
                      </div>
                    </div>
                  </div>
                  <Modal show={this.state.showCategoryModal}>
              <Modal.Header>
                {this.state.modalFields2.operation} Category
              </Modal.Header>
              <Modal.Body>
                <form
                  onSubmit={this.handleCategoryUpdate}
                    // this.state.modalFields2.operation === "Update"
                    //   ? this.handleUpdate
                    //   : this.handleCreate
                  // }
                >
                <div className="form-group" style={{margin: "0 11px"}}>
                      <label>Category</label>
                      <input type="text"
                      // defaultValue={modalShop.garment_details?.stitching_base_price}
                      name="category" className="form-control" id="nameModal" onChange={this.handleChange2} placeholder="Enter Category" required/>
                    </div>
                    <hr className="mx-4"/>
                 <div className="uploadOne">
                  <div className="form-group" style={{margin: "0 11px"}}>
                      <label>Upload Design 1 (Optional)</label>
                      <input type="file" name="stitchingProcess" className="form-control" id="nameModal" placeholder="Upload Icon"/>
                    </div>
                    <div className="row mx-auto my-3">
                      <div className="form-group col-6">
                        <label>Subcatogery 1</label>
                        <input type="text" name="subcategory1" className="form-control" id="nameModal" onChange={this.handleChange2} placeholder="Enter Subcatogery" required/>
                      </div>
                      <div className="form-group col-6">
                        <label>Price</label>
                        <input type="number" name="price1" className="form-control" id="nameModal" onChange={this.handleChange2} placeholder="Enter Price" required/>
                      </div>
                    </div>
                 </div>
                 <hr className="mx-4"/>
                 <div className="uploadOne">
                  <div className="form-group" style={{margin: "0 11px"}}>
                      <label>Upload Design 2 (Optional)</label>
                      <input type="file" name="stitchingProcess" className="form-control" id="nameModal" placeholder="Upload Icon"/>
                    </div>
                    <div className="row mx-auto my-3">
                      <div className="form-group col-6">
                        <label>Subcatogery 2</label>
                        <input type="text" name="subcategory2" className="form-control" id="nameModal" onChange={this.handleChange2} placeholder="Enter Subcatogery" required/>
                      </div>
                      <div className="form-group col-6">
                        <label>Price</label>
                        <input type="number" name="price2" className="form-control" id="nameModal" onChange={this.handleChange2} placeholder="Enter Price" required/>
                      </div>
                    </div>
                 </div>
                  <div style={{ float: "right" }}>
                    <span>
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </span>
                    <span>
                      <button type="button" className="btn btn-primary" onClick={() => this.setState({ showCategoryModal: false })}>
                        Close
                      </button>
                    </span>
                  </div>
                </form>
              </Modal.Body>
            </Modal>
                  
                  </Collapsible><hr/>
                  <Collapsible trigger="Design for Representative">
                  <div className="mx-1 my-2 row">
                    <p className="mb-0">Back Design</p>
                    <p className="mb-0">Front Design</p>
                    <p className="mb-0">General Design</p>
                    <p className="mb-0">Side Design</p>
                  </div>
                  </Collapsible><hr/>
                  </div>
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
