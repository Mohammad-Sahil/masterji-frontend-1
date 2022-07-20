import { Fragment, useEffect, useState } from "react";
import "./Register.css";
import { useSelector, useDispatch } from "react-redux";
import { registeruseraction } from "../../Actions/useraction";
// import { Button } from "@material-ui/core";
import Metadata from "../Metadata";
// import SideBar from "./Sidebar";

const NewProduct = ({ history }) => {
  const dispatch = useDispatch();

  //   const { loading, error, success } = useSelector((state) => state.newProduct);
  let error, success;
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [role, setrole] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      //   dispatch(clearErrors());
    }

    if (success) {
      alert.success("User Registered Successfully");
      history.push("/admin/dashboard");
      //   dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const registerhandle = (e) => {
    e.preventDefault();
    if(!(!password || !cpassword) && password===cpassword){

      const myForm = {
        name,
        email,
        password,
        cpassword,
        role,
      };
      // console.log(myForm);
      dispatch(registeruseraction(myForm));
    }
    };

  const [namefocus, setnamefocus] = useState();
  const [emailfocus, setemailfocus] = useState();
  const [rolefocus, setrolefocus] = useState();
  const [passfocus, setpassfocus] = useState();
  const [cpassfocus, setcpassfocus] = useState();

  return (
    <Fragment>
<Metadata title='Login | Admin | Masterji'/>
     <div className="registercontainer">
        <div class="register-content">
          <form action="index.html">
            <img src="/avatar.svg" />
            <h2 class="title">Register User</h2>
            <div class={`input-div one ${namefocus || (name && "focus")}`}>
              <div class="i">
                <i class="fas fa-user"></i>
              </div>
              <div class="div">
                <h5>Name</h5>
                <input
                  type="text"
                  class="input"
                  value={name || ""}
                  onChange={(e) => setname(e.target.value)}
                  onFocus={() => setnamefocus("focus")}
                  onBlur={() => setnamefocus("")}
                />
              </div>
            </div>
            <div class={`input-div one ${emailfocus || (email && "focus")}`}>
              <div class="i">
                <i class="fas fa-envelope"></i>
              </div>
              <div class="div">
                <h5>Email</h5>
                <input
                  type="email"
                  class="input"
                  value={email || ""}
                  onChange={(e) => setemail(e.target.value)}
                  onFocus={() => setemailfocus("focus")}
                  onBlur={() => setemailfocus("")}
                />
              </div>
            </div>
            <div class={`input-div one ${passfocus || (password && "focus")}`}>
              <div class="i">
                <i class="fas fa-lock"></i>
              </div>
              <div class="div">
                <h5>Password</h5>
                <input
                  type="password"
                  class="input"
                  value={password || ""}
                  onChange={(e) => setpassword(e.target.value)}
                  onFocus={() => setpassfocus("focus")}
                  onBlur={() => setpassfocus("")}
                />
              </div>
            </div>
            <div
              class={`input-div one ${cpassfocus || (cpassword && "focus")}`}
            >
              <div class="i">
                <i class="fas fa-lock"></i>
              </div>
              <div class="div">
                <h5>Confirm Password</h5>
                <input
                  type="password"
                  class="input"
                  value={cpassword || ""}
                  onChange={(e) => setcpassword(e.target.value)}
                  onFocus={() => setcpassfocus("focus")}
                  onBlur={() => setcpassfocus("")}
                />
              </div>
            </div>
            <div class={`input-div one ${rolefocus || (role && "focus")}`}>
              <div class="i">
                <i class="fas fa-hat-cowboy"></i>
              </div>
              <div class="div">
                <h5>Role</h5>
                <input
                  type="text"
                  class="input"
                  value={role || ""}
                  onChange={(e) => setrole(e.target.value)}
                  onFocus={() => setrolefocus("focus")}
                  onBlur={() => setrolefocus("")}
                  list="roles"
                />
                <datalist id="roles">
                  <option value="Admin" />
                  <option value="Developer" />
                  <option value="Analyser" />
                  <option value="Manager" />
                  <option value="User Manager" />
                  <option value="Sales" />
                  <option value="Customer" />
                  <option value="Booking Manager" />
                  <option value="Fabric Sourcing" />
                  <option value="Fashion Consultant" />
                  <option value="Tailor" />
                  <option value="Delivery Partner" />
                </datalist>
              </div>
            </div>
            <input
              type="submit"
              class="btn"
              value="register"
              disabled={false}
              onClick={registerhandle}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
