import { createStore, applyMiddleware } from 'redux';
import rootReducer from 'src/redux/reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const blacklist = import.meta.env.DEV ? [] : [];

const persistConfig = {
  key: 'root',
  storage,
  blacklist,
}

const middleware = import.meta.env.DEV ? [thunk, logger] : [thunk];

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer, applyMiddleware(...middleware));

export default store;
