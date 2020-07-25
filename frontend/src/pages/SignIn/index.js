import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import logo from '../../assets/logo.png';

import Input from '../../components/Input';

import { LogoContent, Button } from './styles';

import { signInRequest } from '../../store/modules/auth/actions';

function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <header>
        <LogoContent>
          <img src={logo} alt="Fastfeet" />
          {/* <h1>FastFeet</h1> */}
        </LogoContent>
      </header>

      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          id="email"
          placeholder="example@email.com"
          typeName="label"
          label="Seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          id="password"
          placeholder="**********"
          typeName="label"
          label="Sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit">
          {loading ? (
            <AiOutlineLoading3Quarters size={22} color="#fff" />
          ) : (
            'Entrar no sistema'
          )}
        </Button>
      </form>
    </>
  );
}

export default SignIn;
