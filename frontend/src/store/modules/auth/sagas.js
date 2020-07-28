import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import history from '../../../services/history';

import api from '../../../services/api';

import { signInFailure, signInSuccess } from './actions';

function* signIn({ payload }) {
  try {
    const response = yield call(api.post, '/sessions', payload);
    const { token } = response.data;

    api.defaults.headers.authorization = `Bearer ${token}`;

    yield put(signInSuccess(token));
  } catch (err) {
    toast.error('Erro na autenticação!');
    yield put(signInFailure());
  }
}

function signOut() {
  api.defaults.headers.authorization = null;
  history.push('/');
}

function setToken({ payload }) {
  if (!payload) {
    return;
  }

  const { token } = payload.auth;
  if (token) {
    api.defaults.headers.authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
  takeLatest('persist/REHYDRATE', setToken),
]);
