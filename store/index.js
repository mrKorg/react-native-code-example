import {applyMiddleware, createStore} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import AsyncStorage from '@react-native-community/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

import rootEpic from 'store/epics';
import rootReducer from 'store/reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['app', 'global', 'auth', 'cart', 'rate'],
  blacklist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const epicMiddleware = createEpicMiddleware();

const middlewares = [epicMiddleware];

if (process.env.NODE_ENV === 'development') {
  const {createLogger} = require('redux-logger');
  const logger = createLogger({
    collapsed: true,
    // duration: true,
    // diff: true,
  });

  middlewares.push(logger);
}

function configureStore() {
  const store = createStore(
    persistedReducer,
    undefined,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );
  epicMiddleware.run(rootEpic);
  return store;
}

const store = configureStore();
const persistor = persistStore(store);

export {store, persistor};
