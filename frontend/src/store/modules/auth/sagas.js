import { all, takeLatest, call, put } from 'redux-saga/effects';

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
    alert('Erro na autenticação!');
    yield put(signInFailure());
  }
}

function signOut() {
  api.defaults.headers.authorization = null;
  history.push('/');
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
