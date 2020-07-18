import React from 'react';

import logo from '../../assets/logo.png';

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
        <label htmlFor="email">
          Seu e-mail
          <input type="email" id="email" placeholder="example@email.com" />
        </label>

        <label htmlFor="password">
          Sua senha
          <input type="password" id="password" placeholder="*********" />
        </label>

        <button type="submit">Entrar no sistema</button>
      </form>
    </>
  );
}

export default SignIn;
