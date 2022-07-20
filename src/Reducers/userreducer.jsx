export const UserReducer = (state = { user: {} }, action) => {
    switch (action.type) {
      case 'LOGIN_REQUEST':
      case 'LOAD_USER_REQUEST':
        return {
          loading: true,
          isAuthenticated: false,
        };
      case 'LOGIN_SUCCESS':
      case 'LOAD_USER_SUCCESS':
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          user: action.payload,
        };
      case 'LOGIN_FAIL':
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