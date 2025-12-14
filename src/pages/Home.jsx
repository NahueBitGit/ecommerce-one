import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { FaShoppingCart, FaBoxOpen, FaHome } from "react-icons/fa";
import { toast } from "react-toastify";
import Layout from "../components/Layout";
import styled from "styled-components";

export default function Home() {
  const { cartQuantity, addToCart } = useCart();
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const res = await fetch("https://68e6e8ac10e3f82fbf3d7c2f.mockapi.io/products");
        const data = await res.json();

        const destacados = data.filter((p) => p.featured === true);
        setFeatured(destacados);
      } catch (err) {
        console.error("Error cargando destacados:", err);
      }
    }

    fetchFeatured();
  }, []);

  const handleAdd = (product) => {
    addToCart(product, 1);
    toast.success(`"${product.name}" agregado al carrito`);
  };

  return (
    <Layout
      title="Inicio | Ecommerce ONE"
      description="Bienvenido a la tienda oficial Ecommerce ONE"
    >
      <HomeWrapper>
        <Title>
          <FaHome /> Bienvenido a Ecommerce ONE
        </Title>

        <Description>
          Ecommerce ONE es una tienda especializada en productos de consumo diario:
          alimentos, bebidas, limpieza, higiene y más.
        </Description>

        <Actions>
          <MainButton to="/products">
            <FaBoxOpen /> Ver Productos
          </MainButton>
        </Actions>

        <SectionTitle>⭐ ¿Por qué elegirnos?</SectionTitle>

        <WhyUsGrid>
          <InfoCard>
            <h3>🚚 Envío Gratis</h3>
            <p>Compras simples, envíos rápidos y sin costo adicional.</p>
          </InfoCard>

          <InfoCard>
            <h3>🔒 Compra Segura</h3>
            <p>Tus pagos y datos están protegidos con encriptación avanzada.</p>
          </InfoCard>

          <InfoCard>
            <h3>📞 Atención 24/7</h3>
            <p>Soporte disponible todo el día para ayudarte cuando lo necesites.</p>
          </InfoCard>
        </WhyUsGrid>

        <SectionTitle>🛒 Productos Destacados</SectionTitle>

        <FeaturedGrid>
          {featured.length === 0 ? (
            <p>No hay productos destacdos por ahora.</p>
          ) : (
            featured.map((p) => (
              <InfoCard key={p.id}>
                <img src={p.image} alt={p.name} />
                <h3>{p.name}</h3>
                <p>${p.price}</p>

                <ButtonGroup>
                  <LinkButton to={`/product/${p.id}`}>Ver detalle</LinkButton>

                  <AddButton onClick={() => handleAdd(p)}>
                    Agregar
                  </AddButton>
                </ButtonGroup>
              </InfoCard>
            ))
          )}
        </FeaturedGrid>

        <CartFloating to="/cart">
          <FaShoppingCart size={24} />
        </CartFloating>
      </HomeWrapper>
    </Layout>
  );
}

const HomeWrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Description = styled.p`
  font-size: 18px;
  margin: 10px 0 20px 0;
  color: #004aad;
`;

const Actions = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
`;

const MainButton = styled(Link)`
  background: #004aad;
  color: white;
  padding: 16px 28px;
  border-radius: 12px;
  font-size: 22px;
  font-weight: bold;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 12px;

  &:hover {
    background: #00337a;
  }
`;

const SectionTitle = styled.h2`
  margin-top: 40px;
  text-align: center;
  font-size: 26px;
  color: #004aad;
`;

const WhyUsGrid = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
`;

const InfoCard = styled.div`
  padding: 20px;
  border-radius: 14px;
  border: 1px solid #d0d8ff;
  background: #f7faff;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 40, 0.08);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }

  img {
    width: 100%;
    height: 150px;
    object-fit: contain;
    margin-bottom: 10px;
  }

  h3 {
    color: #004aad;
    margin-bottom: 6px;
    font-size: 20px;
  }
`;

const FeaturedGrid = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  justify-content: center;
`;

const LinkButton = styled(Link)`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #004aad;
  color: #004aad;
  text-decoration: none;

  &:hover {
    background: #004aad;
    color: white;
  }
`;

const AddButton = styled.button`
  padding: 8px 12px;
  background: #004aad;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background: #00337a;
  }
`;

const CartFloating = styled(Link)`
  position: fixed;
  left: 20px;
  bottom: 25px;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background: #004aad;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  z-index: 1000;

  &:hover {
    background: #00337a;
  }
`;
