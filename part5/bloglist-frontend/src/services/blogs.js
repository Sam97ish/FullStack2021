import axios from 'axios'
const baseUrl = '/api/blogs'

// Sent in header for creating and deleting blogs.
let token = null
const setToken = newToken => {  
  token = `bearer ${newToken}`
}

const clearToken = ()=>{
  token = null
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {    
    headers: { Authorization: token },  }
  const response = await axios.post(baseUrl, newObject, config)  
  return response.data
}

export default { getAll, create, setToken, clearToken }