import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchBar from "./searchBar";
import "./fabricShop.css";
import "./table.css";
import Metadata from "../../Metadata";
import moment from "moment";

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
        orders: [],
        showModal: false,
        modalFields: {
          operation: "Create",
          shop: {},
        },
        searchText: "",
        expandedShop:{
        }
      };

  api_url = " https://us-central1-masterji-19f75.cloudfunctions.net/app/";

  componentDidMount() {
    fetch(this.api_url+"customers/v2/get")
      .then((response) => response.json())
      .then((shops) => {
        console.log("This is shops>> ",shops);
        this.setState({ shops });
      })
      .catch(err => toast.error(err.message));


      fetch(this.api_url+"orders/v2/get")
      .then((response) => response.json())
      .then((orders) => {
        console.log("This is orders>> ",orders);
        this.setState({ orders });
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
    fetch(this.api_url + "orders/v2/post", {
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
      fetch(this.api_url + "orders/v2/put/" + shop.id, {
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

    fetch(this.api_url + "orders/v2/delete/" + shop.id,{
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
    const { shops, searchText, expandedShop, orders } = this.state;
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
      <Metadata title='Users | Admin | Masterji'/>
      <div>
      <ToastContainer/>

        <div className="fashionConsultantContainer row mx-auto mt-4 gx-0" style={Object.keys(expandedShop).length === 0 ? {marginRight:50}:{}}>
        <div id="fabricShopTable" className="fabricShopTable col-6 m-0">
                <div className="ordersTotal my-2 d-flex align-items-center">
                    <div className="ordersTotalText text-warning p-2 mx-2 bg-dark">{filteredShops.length}</div>Total Users
                </div>
            <div class="table-responsive tableDiv">
              
              <table className="table table-condensed">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Sl No</th>
                    <th scope="col">City</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Registered On</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredShops.slice(0, 10).map((shop, index) => (
                    <tr key={shop.id}
                    // onClick={() => this.expandShop(shop)}
                    style={expandedShop.id === shop.id ? {backgroundColor:'#ffa', cursor:'pointer'} : {cursor:'pointer'}}>
                      <td className="text-capitalize">{index + 1}</td>
                      <td className="text-capitalize">{shop.address?.city}</td>
                      <td className="text-capitalize">{shop.contact}</td>
                      <td className="text-capitalize">{moment.utc(new Date(shop.registerAt)).format('MM/DD/YYYY')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div id="fabricShopTable" className="fabricShopTable col-6 m-0">
                <div className="ordersTotal my-2 d-flex align-items-center">
                    <div className="ordersTotalText text-warning p-2 mx-2 bg-dark">{orders.length}</div>Total Orders
                </div>
            <div class="table-responsive tableDiv">
              
              <table className="table table-condensed">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Sl No</th>
                    <th scope="col">Order ID</th>
                    <th scope="col">Phone</th>
                    <th scope="col">City</th>
                    <th scope="col">Order Date</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 10).map((shop, index) => (
                    <tr key={shop.id}
                    // onClick={() => this.expandShop(shop)}
                    style={expandedShop.id === shop.id ? {backgroundColor:'#ffa', cursor:'pointer'} : {cursor:'pointer'}}>
                      <td className="text-capitalize">{index + 1}</td>
                      <td className="text-capitalize">{shop.orderID}</td>
                      <td className="text-capitalize">{shop.phoneNumber}</td>
                      <td className="text-capitalize">{shop.address?.city}</td>
                      <td className="text-capitalize">{moment.utc(new Date(shop.bookingDate)).format('MM/DD/YYYY')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>


        </div>
      </div>
      </>
    );
  }
}

export default Fabric;
