const initialState = {
    isError: false,
    msg: ''
  }
  
  const auth = (state=initialState, action) => {
    switch(action.type){
      case 'CLEAR': {
        return {
          ...state,
          msg: ''
        }
      }
      case 'BOOK_PENDING': {
        return {
          ...state,
          isError: false
        }
      }
      case 'BOOK_REJECTED': {
        return {
          ...state,
          isError: true,
          msg: action.payload.response.data.msg,
        }
      }
      case 'BOOK_FULFILLED': {
        return {
          ...state,
          isError: false,
          msg: action.payload.data.msg
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