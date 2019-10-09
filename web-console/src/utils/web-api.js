import axios from 'axios'
import localState from './local-state'
import { pickBy } from 'lodash'


const bearerFormat = (accessToken) => `Bearer ${accessToken}`

const webAPI = () => {
  const server = axios.create()
  const accessToken = localState.load().accessToken
  if(accessToken) {
    server.defaults.headers.common['Authorization'] = bearerFormat(accessToken)
  }
  server.defaults.headers.common['Content-Type'] = 'application/json'
  server.interceptors.response.use(
    response => ({ ...response, err: false }),
    error => {
      if(error.response.status === 401) {
        return server.get('/api/common/refresh-access-token', {
          headers: { refreshtoken: localState.load().refreshToken }
        }).then(res => {
          localState.save(res.data)
          error.config.headers['Authorization'] = bearerFormat(res.data.accessToken)
          server.defaults.headers.common['Authorization'] = bearerFormat(res.data.accessToken)
          return server.request(error.config)
        })
      }
      return { ...error.response, err: true }
    },
  )

  return {
    signup: async (username, password) => {
      const res = await server.post('/api/common/sign-up', { username, password })
      return res
    },
    login: async (username, password) => {
      const res = await server.post('/api/common/sign-in', { username, password })
      return res
    },
    logout: async () => {
      const headers = { refreshtoken: localState.load().refreshToken }
      const res = await server.delete('/api/common/logout', { headers })
      return res
    },
    profile: async () => {
      const res = await server.get('/api/common/profile')
      return res
    },
  }
}

export default webAPI()
