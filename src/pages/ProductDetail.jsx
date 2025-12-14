import { useParams } from "react-router-dom";
import { useProducts } from "../contexts/ProductsContext";
import { useCart } from "../contexts/CartContext";
import Layout from "../components/Layout";
import { toast } from "react-toastify";
import styled from "styled-components";

export default function ProductDetail() {
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();

  const product = products.find(p => String(p.id) === String(id));

  if (!product) {
    return (
      <Layout title="Producto no encontrado">
        <h2>❌ Producto no encontrado</h2>
        <p>ID: {id}</p>
      </Layout>
    );
  }

  const handleAdd = () => {
    addToCart(product);
    toast.success(`"${product.name}" añadido al carrito`);
  };

  return (
    <Layout title={product.name} description={product.description}>
      <Container>

        <Image src={product.image || "/placeholder.png"} />

        <Info>
          <h1>{product.name}</h1>
          <p className="price">${product.price}</p>

          <p className="desc">{product.description}</p>

          {product.category && (
            <p className="cat">Categoría: {product.category}</p>
          )}

          <button className="buyBtn" onClick={handleAdd} aria-label={`Añadir ${product.name} al carrito`}>
            Añadir al carrito
          </button>
        </Info>

      </Container>
    </Layout>
  );
}


const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 50px;
    text-align: left;
    align-items: flex-start;
    justify-content: center;
  }
`;

const Image = styled.img`
  width: 420px;
  height: 420px;
  object-fit: contain;
  background: white;
  border: 1px solid #d0d8ff;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 40, 0.08);

  @media (max-width: 768px) {
    width: 80%;
    height: auto;
  }
`;

const Info = styled.div`
  max-width: 480px;
  margin-top: 25px;

  h1 {
    color: #004aad;
    margin-bottom: 10px;
  }

  .price {
    font-size: 1.8rem;
    font-weight: bold;
    color: #00337a;
    margin: 12px 0;
  }

  .desc {
    margin-top: 10px;
    line-height: 1.5;
    color: #333;
  }

  .cat {
    margin-top: 10px;
    font-style: italic;
    color: #666;
  }

  .buyBtn {
    margin-top: 25px;
    padding: 14px 22px;
    background: #004aad;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1.15rem;
    transition: 0.2s;

    &:hover {
      background: #00337a;
    }
  }
`;

