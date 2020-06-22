export const addTask = ( task ) => {
  return {
    type: 'ADD',
    task
  }
}

export const deleteTask = ( i ) => {
  return {
    type: 'DELETE',
    i
  }
}

export const showHide = () => {
  return {
    type: 'MODAL'
  }
}
export const name = (payload) => {
  return {
    type: 'NAME',
    payload
  }
}