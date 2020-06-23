const initialState = {
    books : [],
    isLoading: true,
    pageInfo: ''
  }
  
  const fetchData = (state=initialState, action) => {
    switch(action.type){
    case 'GET_PENDING': {
        return {
            ...state,
            isLoading: true,
        }
        }
      case 'GET_FULFILLED': {
        return {
          ...state,
          isLoading: false,
          books: action.payload.data.data,
          pageInfo: action.payload.data.pageInfo
        }
      }
      default: {
        return {
          ...state
        }
      }
    }
  }
  
  export default fetchData