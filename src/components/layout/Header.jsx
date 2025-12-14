import { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { 
  FaShoppingCart, FaUser, FaMoon, FaSun, FaHome,
  FaBars, FaTimes
} from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { useThemeMode } from "../../contexts/ThemeContext";

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: ${({ theme }) => theme.colors.navbarBg};
  color: ${({ theme }) => theme.colors.navbarText};
  display: flex;
  align-items: center;
  z-index: 999;
  padding: 0 1rem;
`;

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Brand = styled(NavLink)`
  font-size: 1.5rem;
  font-weight: bold;
  color: inherit;
  text-decoration: none;
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  /* 🔹 MOBILE: ocultar menú */
  @media (max-width: 750px) {
    position: fixed;
    top: 70px;
    right: ${({ open }) => (open ? "0" : "-100%")};
    flex-direction: column;
    width: 200px;
    background: ${({ theme }) => theme.colors.navbarBg};
    padding: 1rem;
    transition: right 0.3s ease;
    gap: 0.8rem;
    border-left: 1px solid #333;
    height: calc(100vh - 70px);
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

const StyledLink = styled(NavLink)`
  color: inherit;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 6px 10px;
  border-radius: 5px;
  position: relative;

  &.active {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  font-size: 1.3rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 6px;
  border-radius: 5px;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

const Badge = styled.span`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 0.8rem;
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  font-size: 1.7rem;
  color: inherit;
  display: none;

  @media (max-width: 750px) {
    display: block;
  }
`;

export default function Header({ cartCount = 0 }) {
  const { isAuthenticated, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useThemeMode();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Nav>
      <Inner>
        <Brand to="/">Ecommerce ONE</Brand>

        <MenuButton onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </MenuButton>

        <NavRight open={menuOpen}>
          <StyledLink to="/">
            <FaHome size={18} />
          </StyledLink>

          <StyledLink to="/products">Productos</StyledLink>

          <StyledLink to="/cart">
            <FaShoppingCart />
            <Badge>{cartCount}</Badge>
          </StyledLink>

          <IconButton onClick={toggleDarkMode}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </IconButton>

          {!isAuthenticated && (
            <StyledLink to="/login">
              <FaUser /> Ingresar
            </StyledLink>
          )}

          {isAuthenticated && (
            <>
              <StyledLink to="/admin/products">Admin</StyledLink>
              <IconButton onClick={logout}>
                <FaUser />
              </IconButton>
            </>
          )}
        </NavRight>
      </Inner>
    </Nav>
  );
}