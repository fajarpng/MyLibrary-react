import qs from 'querystring'
import axios from '../../asets/helper/axios'
const {REACT_APP_URL} = process.env

export const login = (email, password)=>{
    const url = `${REACT_APP_URL}users/login` 
  return {
    type: 'LOGIN',
    payload: axios().post(`${url}`, qs.stringify({email, password}))
  }
}