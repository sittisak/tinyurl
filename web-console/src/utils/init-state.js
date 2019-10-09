import localState from './local-state'
import api from './web-api'


const initState = async () => {
  const { refreshToken, accessToken } = localState.load()
  if(!refreshToken && !accessToken) {
    return null
  }

  const res = await api.profile()
  if(res.err) {
    localState.clean()
    return null
  }

  return res.data
}

export default initState
