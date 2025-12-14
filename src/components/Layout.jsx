import SEO from "./SEO";
import styled from "styled-components";
import BackToTop from "../components/UI/BackToTop";
import Header from "./layout/Header"; 
import { useCart } from "../contexts/CartContext";

export default function Layout({ children, title, description }) {
  const { cartQuantity } = useCart();

  return (
    <Wrapper>
      <SEO title={title} description={description} />

      <Header cartCount={cartQuantity} />

      <Main>
        {children}
      </Main>

      <BackToTop /> 

      <Footer>
        <p>© 2025 Ecommerce ONE</p>
      </Footer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  padding-top: 80px; /* ⭐ IMPORTANTE para que no lo tape el navbar fijo */
`;

const Footer = styled.footer`
  text-align: center;
  padding: 1rem;
  background: #f5f5f5;
`;
