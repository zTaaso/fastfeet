import React from 'react';

import logo from '../../assets/logo.png';

import Input from '../../components/Input';

import { LogoContent } from './styles';

function SignIn() {
  function handleSubmit(e) {
    e.preventDefault();
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
        />

        <Input
          type="password"
          id="password"
          placeholder="**********"
          typeName="label"
          label="Sua senha"
        />

        <button type="submit">Entrar no sistema</button>
      </form>
    </>
  );
}

export default SignIn;
