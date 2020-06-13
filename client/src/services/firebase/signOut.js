import firebase from 'src/services/firebase';
import store from 'src/redux/store';

const signOut = () => {
  return new Promise((resolve, reject) => {
    firebase.auth().signOut()
      .then(() => {
        store.dispatch({
          type: 'USER_SET',
          payload: null
        });
        store.dispatch({
          type: 'CHATROOMS_SET',
          payload: [],
        });
        resolve()
      })
      .catch((e) => {
        reject();
      });
  })
}

export default signOut;