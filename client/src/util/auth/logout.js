import axios from 'axios';
import log from 'src/util/log';
import store from 'src/redux/store';

const logout = () => {
  axios.post('/api/user/logout')
    .then((res) => {
      log('logout successful', res);
      store.dispatch({
        type: 'USER_SET',
        payload: null
      })
    })
    .catch((e) => {
      log('logout error', e)
    })
}

export default logout;