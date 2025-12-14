import React, { useCallback } from "react";
import { FaCartPlus } from "react-icons/fa";
import styled from "styled-components";
import { useCart } from "../contexts/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAdd = useCallback(() => {
    addToCart(product);
  }, [addToCart, product]);

  return (
    <Card className="col-12 col-sm-6 col-md-4 col-lg-3">
      <div className="p-3">
        <img src={product.image} alt={product.name} className="img-fluid" />
        <h5>{product.name}</h5>
        <p>${product.price}</p>

        <AddBtn onClick={handleAdd}>
          <FaCartPlus /> Añadir al carrito
        </AddBtn>
      </div>
    </Card>
  );
}

export default React.memo(ProductCard);

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-bottom: 16px;
`;

const AddBtn = styled.button`
  padding: 8px 12px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
`;
