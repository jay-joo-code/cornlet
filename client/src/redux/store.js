import { createStore, applyMiddleware } from 'redux';
import rootReducer from 'src/redux/reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const blacklist = process.env.NODE_ENV === 'development' ? [] : [];

const persistConfig = {
  key: 'root',
  storage,
  blacklist,
}

const middleware = process.env.REACT_APP_ENV !== 'production' ? [thunk, logger] : [thunk];
 
const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer, applyMiddleware(...middleware));

export default store;