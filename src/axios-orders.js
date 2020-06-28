import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://react-burger-builder-679aa.firebaseio.com/',
})

export default instance
