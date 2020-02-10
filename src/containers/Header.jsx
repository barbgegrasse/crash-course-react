import React from "react";
import styled from "@emotion/styled";
import theme from "../styles/theme";

const BlocHeader = styled("header")`
  position: sticky;
  top: 0;
  z-index: 10;

  padding: 10px 0;
  align-items: center;
  background: linear-gradient(145deg, #222833, #1d212b);
  box-shadow: 13px 13px 21px #191d25, -13px -13px 21px #272d3b;
  margin-bottom: 40px;
`;

const Container = styled("header")`
  display: flex;
  justify-content: space-between;
`;

const Logo = styled("p")`
  font-family: ${theme.fonts.logo};
  font-size: 35px;
  color: ${theme.colors.primary};
`;

const Nav = styled("nav")`
  display: flex;
  align-items: center;
`;

const LinkNav = styled("a")`
  display: inline-block;
  padding-left: 20px;
  color: ${theme.colors.main};
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  transition: all 0.3s ease-in-out;
  &:hover {
    text-decoration: none;
    color: ${theme.colors.primary};
  }
`;

const Header = () => {
  return (
    <BlocHeader>
      <Container className="max-container">
        <Logo>Movie App</Logo>
        <Nav>
          <LinkNav href="#search">Rechercher</LinkNav>
          <LinkNav href="#popular">A la une</LinkNav>
          <LinkNav href="#basket">Panier</LinkNav>
        </Nav>
      </Container>
    </BlocHeader>
  );
};

export default Header;