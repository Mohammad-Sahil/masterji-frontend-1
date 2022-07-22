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
import Register from "./Components/Admin/Portal/Register";
import ForgotPass from "./Components/Authentication/ForgotPass";
import ResetPass from "./Components/Authentication/ResetPass";
import Executives from "./Components/Admin/Executives";
import Tailors from "./Components/Admin/Tailors";
import Protected from "./Protected";
import { useDispatch, useSelector } from "react-redux";
import { loaduseraction } from "./Actions/useraction";
import Error from "./Components/Layout/Error";
// import PortalUsers from "./Components/Admin/Portal/PortalUsers";
import ReactLoading from "react-loading";
const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated,loading } = useSelector((state) => state.User);

  useEffect(() => {
    dispatch(loaduseraction());
  }, [dispatch]);

  return (
    <>
      {loading && <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          "align-items": "center",
        }}
      >
        <ReactLoading
          type="bars"
          color="#ffc107"
          height={"5%"}
          width={"5%"}
        />
      </div>}
      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route exact path="/login" element={<Login />} />
        <Route exact path="/forgot" element={<ForgotPass />} />
        <Route exact path="/reset/:id/:token" element={<ResetPass />} />

        <Route exact path="/admin" element={<Protected element={Admin} />}>
          <Route
            exact
            path="register"
            element={<Protected Role={["Admin"]} element={Register} />}
          />
          {/* <Route exact path="portalusers" element={<Protected Role={['Admin']} element={PortalUsers} />} /> */}

          <Route path="manage" element={<Protected element={Manage} />}>
            <Route
              exact
              path="fashion"
              element={
                <Protected
                  Role={[
                    "Admin",
                    "Developer",
                    "Analyser",
                    "Manager",
                    "Booking Manager",
                    "Fashion Consultant",
                  ]}
                  element={FashionConsultants}
                />
              }
            />
            <Route
              exact
              path="fabric"
              element={
                <Protected
                  Role={[
                    "Admin",
                    "Developer",
                    "Analyser",
                    "Manager",
                    "Booking Manager",
                    "Fabric Sourcing",
                  ]}
                  element={Fabric}
                />
              }
            />
            <Route
              exact
              path="garments"
              element={
                <Protected
                  Role={[
                    "Admin",
                    "Developer",
                    "Analyser",
                    "Manager",
                    "S",
                    "Booking Manager",
                    "Delivery Manager",
                  ]}
                  element={Garments}
                />
              }
            />
            <Route
              exact
              path="faq"
              element={
                <Protected
                  Role={["Admin", "Developer", "Analyser", "Manager"]}
                  element={FAQs}
                />
              }
            />
            <Route
              exact
              path="about"
              element={
                <Protected
                  Role={["Admin", "Developer", "Analyser", "Manager"]}
                  element={About}
                />
              }
            />
            <Route
              exact
              path="users"
              element={
                <Protected
                  Role={[
                    "Admin",
                    "Developer",
                    "Analyser",
                    "Manager",
                    "User Manager",
                    "S",
                    "Booking Manager",
                    "Delivery Manager",
                  ]}
                  element={Users}
                />
              }
            />
            <Route
              exact
              path="queries"
              element={
                <Protected
                  Role={[
                    "Admin",
                    "Developer",
                    "Analyser",
                    "Manager",
                    "Customer",
                  ]}
                  element={Queries}
                />
              }
            />
            <Route
              exact
              path="consultant"
              element={
                <Protected
                  Role={["Admin", "Developer", "Analyser", "Manager"]}
                  element={ConsultantBooking}
                />
              }
            />
          </Route>

          <Route exact path="orders" element={<Protected element={Orders} />} />
          <Route
            exact
            path="executives"
            element={<Protected element={Executives} />}
          />
          <Route
            exact
            path="Tailors"
            element={
              <Protected
                Role={["Admin", "Developer", "Analyser", "Manager", "Tailor"]}
                element={Tailors}
              />
            }
          />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default App;
