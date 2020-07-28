import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export default (rootReducer) => {
  const persistedReducer = persistReducer(
    {
      key: 'fastfeet',
      storage,
      whitelist: ['auth'],
    },
    rootReducer
  );

  return persistedReducer;
};
