import styled from 'styled-components';
import { darken } from 'polished';

export const Content = styled.header`
  height: 60px;
  width: 100%;

  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: space-between;

  padding: 5px;
  border: 1px solid #dddddd;
`;

export const Navbar = styled.nav`
  display: flex;
  flex-direction: row;
  height: 30px;
`;

export const LogoContent = styled.div`
  border-right: 1px solid #dddddd;
  padding: 5px 10px;
  margin-right: 10px;

  display: flex;
  align-items: center;

  img {
    width: 135px;
    height: 24px;
  }
`;

export const Tabs = styled.ul`
  display: flex;
  align-items: center;

  li {
    margin-right: 8px;

    a {
      text-transform: uppercase;
      font-family: 'Roboto';
      font-weight: bold;
      color: #999999;

      transition: background 0.5s;

      &:hover {
        color: ${darken(0.12, '#999999')};
      }
    }

    a.selected {
      color: #444444;
    }
  }
`;

export const ProfileSection = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
`;

export const LogoutContent = styled.div`
  p {
    color: #666666;
  }

  a {
    color: #de3b3b;
  }
`;
