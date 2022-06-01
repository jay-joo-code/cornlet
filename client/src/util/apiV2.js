import axios from 'axios'
import history from 'src/util/history'
import store from 'src/redux/store'
import logout from 'src/util/auth/logout'

const BASE_URL = '/api'

const objectToQueryString = (obj) => {
  Object.keys(obj).forEach((key) => {
    const undef = obj[key] === undefined
    const emptyStr = obj[key] === ''
    if (undef || emptyStr) {
      delete obj[key]
    }
  })
  return new URLSearchParams(obj).toString()
}

const handleApi = (method, url, variables) =>
  new Promise((resolve, reject) => {
    // const { accessToken } = store.getState().authState
    const headers = {
      'Content-Type': 'application/json',
      // Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
    }
    axios({
      url: `${BASE_URL}${url}`,
      method,
      headers,
      params: method === 'get' ? variables : undefined,
      data: method !== 'get' ? variables : undefined,
      paramsSerializer: objectToQueryString,
    }).then(
      (response) => {
        resolve(response.data)
      },
      (error) => {
        console.log('error?.response?.data', error?.response?.data)
        if (error.response) {
          if (error?.response?.data === 'Google OAuth error') {
            // TODO: update toast
            // showToast({
            //   id: 'google-session-expired',
            //   variant: 'error',
            //   msg: 'Google auth session expired',
            // })
            // TODO: auto signout on oauth error
            // must be on a new react page,
            // since hooks like router, dispatch are needed
            history.push('/signout')
          }
          const { code, message } = error.response.data
          if (code === 404) {
            if (message === 'Access token has expired') {
              history.push('/refresh-token')
            } else {
              // TODO: update toast
              // showToast({
              //   id: 'session-expired',
              //   variant: 'error',
              //   msg: 'Session expired',
              // })
              store.dispatch(logout())
              history.push({
                pathname: '/login',
                state: {
                  prevPath: document.location.pathname + document.location.search,
                },
              })
            }
          } else {
            reject(error)
          }
        } else {
          reject(error)
        }
      }
    )
  })

const api = {
  get: (url, variables) => handleApi('get', url, variables),
  put: (url, variables) => handleApi('put', url, variables),
  post: (url, variables) => handleApi('post', url, variables),
  delete: (url, variables) => handleApi('delete', url, variables),
}

export default api
