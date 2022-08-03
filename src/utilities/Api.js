import axios from 'axios'
import config from '@/config'

export default () => {
  return axios.create({
    baseURL: config.backend_url,
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
      'Access-Control-Allow-Origin': '*'
    }
  })
}