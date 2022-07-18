import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Admin from "./Components/Admin/Admin";
import FashionConsultants from "./Components/Admin/Manage/FashionConsultants";
import Fabric from "./Components/Admin/Manage/Fabric";
import Garments from "./Components/Admin/Manage/Garments";
import About from "./Components/Admin/Manage/About";
import Users from "./Components/Admin/Manage/Users";
import Queries from "./Components/Admin/Manage/Queries";
import ConsultantBooking from "./Components/Admin/Manage/ConsultantBooking";
import FAQs from "./Components/Admin/Manage/FAQs";
import Home from "./Components/Home";
import Orders from "./Components/Admin/Orders";
import Manage from "./Components/Admin/Manage/Manage";
import Login from "./Components/Authentication/Login";
import Executives from "./Components/Admin/Executives";
import Tailors from "./Components/Admin/Tailors";
import Protected from "./Protected";
import { useDispatch, useSelector } from "react-redux";
import { loaduseraction } from "./Actions/useraction";
import Error from "./Components/Layout/Error";
const App = () => {
  const dispatch = useDispatch()
  const {isAuthenticated} = useSelector(state=>state.User)

  let user = {
    Name:'Shera',
    Email:'sheraofficials@gmail.com',
    Role:'developer'
  }
  useEffect(() => {
    dispatch(loaduseraction({user}))
  }, [dispatch])
  
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/admin" element={<Protected element={Admin}/>}>
          <Route path="manage" element={<Protected element={Manage} />}>
            <Route exact path="fashion" element={<Protected Role={['admin','developer','analyser','manager','booking_manager','fashion_consultant']} element={FashionConsultants} />} />
            <Route exact path="fabric" element={<Protected Role={['admin','developer','analyser','manager','booking_manager','fabric_sourcing']} element={Fabric} />} />
            <Route exact path="garments" element={<Protected Role={['admin','developer','analyser','manager','sales','booking_manager','delivery_manager']} element={Garments} />} />
            <Route exact path="faq" element={<Protected Role={['admin','developer','analyser','manager']} element={FAQs} />} />
            <Route exact path="about" element={<Protected Role={['admin','developer','analyser','manager']} element={About} />} />
            <Route exact path="users" element={<Protected Role={['admin','developer','analyser','manager','user_manager','sales','booking_manager','delivery_manager']} element={Users} />} />
            <Route exact path="queries" element={<Protected Role={['admin','developer','analyser','manager','customer']} element={Queries} />} />
            <Route exact path="consultant" element={<Protected Role={['admin','developer','analyser','manager']} element={ConsultantBooking} />} />
          </Route>
          <Route exact path="orders" element={<Protected element={Orders} />} />
          <Route exact path="executives" element={<Protected element={Executives} />} />
          <Route exact path="tailors" element={<Protected Role={['admin','developer','analyser','manager','tailor']} element={Tailors} />} />

        </Route>
        <Route path='*' element={<Error />} />
      </Routes>
    </>
  );
};

export default App;
