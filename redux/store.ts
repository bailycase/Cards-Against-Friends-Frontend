import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['User', 'Game'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore() {
  // const rootReducer = combineReducers({ User });
  const composedEnhancers = composeWithDevTools();
  const store = createStore(persistedReducer, composedEnhancers);

  const persistor = persistStore(store);

  // if (module.hot) {
  // module.hot.accept(rootReducer, () => {
  // // This fetch the new state of the above reducers.
  // const nextRootReducer = rootReducer;
  // store.replaceReducer(persistReducer(persistConfig, nextRootReducer));
  // });
  // }

  return { store, persistor };
}
