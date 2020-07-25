import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import logo from '../../assets/logo.png';

import { signOut } from '../../store/modules/auth/actions';

import {
  Content,
  Navbar,
  LogoContent,
  Tabs,
  ProfileSection,
  LogoutContent,
} from './styles';

function Header() {
  const history = useHistory();
  const dispatch = useDispatch();

  const { pathname } = history.location;

  const routes = [
    { name: 'deliveries', label: 'Encomendas' },
    { name: 'deliverymen', label: 'Entregadores' },
    { name: 'recipients', label: 'Destinatários' },
    { name: 'problems', label: 'Problemas' },
  ];
  const tabs = routes.map((r) => ({
    ...r,
    isSelected: pathname.includes(r.name),
  }));

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Content>
      <Navbar>
        <LogoContent>
          <img src={logo} alt="FastFeet" />
        </LogoContent>

        <Tabs>
          {tabs.map((tab) => (
            <li key={tab.name}>
              <Link
                to={`/${tab.name}`}
                className={tab.isSelected ? 'selected' : ''}
              >
                {tab.label}
              </Link>
            </li>
          ))}
        </Tabs>
      </Navbar>

      <ProfileSection>
        <LogoutContent>
          <p>Admin FastFeet</p>
          <button type="button" onClick={handleSignOut}>
            Sair do sistema
          </button>
        </LogoutContent>
      </ProfileSection>
    </Content>
  );
}

export default Header;
