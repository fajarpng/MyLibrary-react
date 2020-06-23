import axios from '../../asets/helper/axios'
const {REACT_APP_URL} = process.env

export const fetchBook = (param) =>{
    const url = `${REACT_APP_URL}books?${param}`
  return {
    type: 'GET',
    payload: axios().get(url)
  }
}