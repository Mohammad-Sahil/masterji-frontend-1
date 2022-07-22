export const UserReducer = (state = { user: {} }, action) => {
    switch (action.type) {
      case 'LOGIN_REQUEST':
      case 'REGISTER_USER_REQUEST':
      case 'LOAD_USER_REQUEST':
        return {
          loading: true,
          isAuthenticated: false,
        };
      case 'LOGIN_SUCCESS':
      case 'REGISTER_USER_SUCCESS':
      case 'LOAD_USER_SUCCESS':
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          user: action.payload,
        };
      case 'LOGIN_FAIL':
      case 'REGISTER_USER_FAIL':
        return {
          ...state,
          loading: false,
          isAuthenticated: false,
          error: action.payload,
        };
      case 'LOAD_USER_FAIL':
        return {
          loading: false,
          isAuthenticated: false,
          error: action.payload,
          user:null
        };
      case 'LOGOUT_USER_SUCCESS':
        return {
          loading: false,
          isAuthenticated: false,
          user: null,
        };
      case 'LOGOUT_USER_FAIL':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case 'CLEAR_ERRORS':
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
export const RegisterReducer = (state = { }, action) => {
    switch (action.type) {
      case 'REGISTER_USER_REQUEST':
        return {
          loading: true,
        };
      case 'REGISTER_USER_SUCCESS':
        return {
          ...state,
          loading: false,
        };
      case 'REGISTER_USER_FAIL':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case 'CLEAR_ERRORS':
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  export const ForgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
      case 'FORGOT_PASSWORD_REQUEST':
      case 'RESET_PASSWORD_REQUEST':
        return {
          ...state,
          loading: true,
          error: null,
        };
      case 'FORGOT_PASSWORD_SUCCESS':
        return {
          ...state,
          loading: false,
          message: action.payload,
        };
  
      case 'RESET_PASSWORD_SUCCESS':
        return {
          ...state,
          loading: false,
          success: action.payload,
        };
  
      case 'FORGOT_PASSWORD_FAIL':
      case 'RESET_PASSWORD_FAIL':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case 'CLEAR_ERRORS':
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };