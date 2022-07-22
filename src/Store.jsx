import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { ForgotPasswordReducer, RegisterReducer, UserReducer } from "./Reducers/userreducer";

const reducer = combineReducers({
  User:UserReducer,
  RegisterUser:RegisterReducer,
  ForgotPassword: ForgotPasswordReducer,

});

let initialState = {
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
