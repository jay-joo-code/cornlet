import store from 'src/redux/store';
import axios from 'axios';
import log from 'src/util/log';

const fetchSelfAndStore = (id) => {
  return new Promise((resolve, reject) => {
    axios.get(`/api/user/${id}`)
      .then((res) => {
        store.dispatch({
          type: 'USER_SET',
          payload: res.data
        })
        resolve(res.data);
      })
      .catch((e) => {
        log('ERROR util auth fetchselfandstore', e);
        reject(e);
      })
  })
}

export default fetchSelfAndStore