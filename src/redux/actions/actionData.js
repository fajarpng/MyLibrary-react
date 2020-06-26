import axios from '../../asets/helper/axios'
const {REACT_APP_URL} = process.env

//action book
export const addBook = (data,token) =>{
     const url = `${REACT_APP_URL}books`
  return {
    type: 'BOOK',
    payload: axios(token).post(url, data)
  }
}
export const updateBook = (data,id,token) =>{
	const url = `${REACT_APP_URL}books/${id}`
  return {
    type: 'BOOK',
    payload: axios(token).patch(url, data)
  }
}
export const deleteBook = (id,token) => {
	const url = `${REACT_APP_URL}books/${id}`
	return {
    type: 'BOOK',
    payload: axios(token).delete(url)
  }
}
// action genre
export const addGenre = (data,token) =>{
     const url = `${REACT_APP_URL}genres`
  return {
    type: 'BOOK',
    payload: axios(token).post(url, data)
  }
}
export const updateGenre = (data,id,token) =>{
	const url = `${REACT_APP_URL}genres/${id}`
  return {
    type: 'BOOK',
    payload: axios(token).patch(url, data)
  }
}
export const deleteGenre = (id,token) => {
	const url = `${REACT_APP_URL}genres/${id}`
	return {
    type: 'BOOK',
    payload: axios(token).delete(url)
  }
}
// action author
export const addAuthor = (data,token) =>{
     const url = `${REACT_APP_URL}authors`
  return {
    type: 'BOOK',
    payload: axios(token).post(url, data)
  }
}
export const updateAuthor = (data,id,token) =>{
	const url = `${REACT_APP_URL}authors/${id}`
  return {
    type: 'BOOK',
    payload: axios(token).patch(url, data)
  }
}
export const deleteAuthor = (id,token) => {
	const url = `${REACT_APP_URL}authors/${id}`
	return {
    type: 'BOOK',
    payload: axios(token).delete(url)
  }
}
// action transaction
export const addTrans = (data,token) =>{
     const url = `${REACT_APP_URL}trans`
  return {
    type: 'BOOK',
    payload: axios(token).post(url, data)
  }
}
export const deleteTrans = (id,token) => {
	const url = `${REACT_APP_URL}trans/${id}`
	return {
    type: 'BOOK',
    payload: axios(token).delete(url)
  }
}
// clear
export const clear = () => {
  return {
    type: 'CLEAR'
  }
}