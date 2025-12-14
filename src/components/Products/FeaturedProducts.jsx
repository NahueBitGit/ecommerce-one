import { useEffect, useState } from "react";
import styled from "styled-components";
import { API_BASE } from "../config/api";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_BASE)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.filter(p => p.featured));
      })
      .catch((err) =>
        console.error("Error cargando productos destacados", err)
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando productos destacados...</p>;

  return (
    <Grid>
      {products.map((p) => (
        <Card key={p.id}>
          <img src={p.image} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </Card>
      ))}
    </Grid>
  );
}


const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
`;

const Card = styled.div`
  background: white;
  border-radius: 10px;
  padding: 14px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);

  img {
    width: 100%;
    height: 140px;
    object-fit: contain;
    margin-bottom: 10px;
  }

  h3 {
    font-size: 16px;
    color: ${(p) => p.theme.colors.primary};
  }
`;
