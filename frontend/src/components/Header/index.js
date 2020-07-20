import React from 'react';
import { useHistory, Link } from 'react-router-dom';

import logo from '../../assets/logo.png';

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
  const { pathname } = history.location;

  const routes = [
    { name: 'deliveries', label: 'Encomendas' },
    { name: 'deliveryman', label: 'Entregadores' },
    { name: 'recipients', label: 'Destinatários' },
    { name: 'problems', label: 'Problemas' },
  ];
  const tabs = routes.map((r) => ({
    ...r,
    isSelected: pathname.includes(r.name),
  }));

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
          <a href="#">Sair do sistema</a>
        </LogoutContent>
      </ProfileSection>
    </Content>
  );
}

export default Header;
