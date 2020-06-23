const initialState = {
    isError: false,
    msg: '',
    token: null
  }
  
  const auth = (state=initialState, action) => {
    switch(action.type){
      case 'LOGIN_PENDING': {
        return {
          ...state,
          isError: false
        }
      }
      case 'LOGIN_REJECTED': {
        return {
          ...state,
          isError: true,
          msg: action.payload.response.data.msg,
        }
      }
      case 'LOGIN_FULFILLED': {
        return {
          ...state,
          isError: false,
          token: action.payload.data.token
        }
      }
      default: {
        return {
          ...state
        }
      }
    }
  }
  
  export default auth