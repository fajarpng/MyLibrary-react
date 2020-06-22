const initialState = {
    value: 0,
    show : false,
    list: [],
    name: null
  }
  
const counter = (state=initialState, action) => {
  switch(action.type){
    case 'MODAL': {
      return {
        ...state,
        show: !state.show
      }
    }
    case 'ADD': {
      const list = state.list
      list.push(action.task)
      return {
        ...state,
        list
      }
    }
    case 'DELETE': {
      const list = state.list
      list.splice(action.i, 1)
      return {
        ...state,
        list
      }
    }
    case 'NAME': {
      return {
        ...state,
        name: action.payload
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}
  
  export default counter