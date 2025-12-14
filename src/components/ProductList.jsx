import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../contexts/ProductsContext";
import DeleteModal from "./DeleteModal";

export default function ProductList({ onEdit }) {
  const { products, loading, error, deleteProduct } = useProducts();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDeleteClick = useCallback((product) => {
    setDeleteTarget(product);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      const result = await deleteProduct(deleteTarget.id);
      if (result.ok) {
        setDeleteTarget(null);
      }
    } finally {
      setDeleteLoading(false);
    }
  }, [deleteTarget, deleteProduct]);

  const handleCancelDelete = useCallback(() => {
    setDeleteTarget(null);
  }, []);

  if (loading) return <p>Cargando productos…</p>;
  if (error) return <p style={{ color: "red" }}>❌ {error}</p>;

  return (
    <div>
      <h2>Productos</h2>
      {products.length === 0 && <p>No hay productos.</p>}

      <ul>
        {products.map(prod => (
          <li key={prod.id} style={{ marginBottom: "10px" }}>
            <Link to={`/product/${prod.id}`}>
              <strong>{prod.name}</strong>
            </Link>{" "}
            — ${prod.price}

            <br />
            {prod.description}

            <br />
            <button onClick={() => onEdit(prod)} aria-label={`Editar ${prod.name}`}>Editar</button>
            <button onClick={() => handleDeleteClick(prod)} aria-label={`Eliminar ${prod.name}`}>Eliminar</button>
          </li>
        ))}
      </ul>

      <DeleteModal
        open={deleteTarget !== null}
        title="Eliminar producto"
        message={`¿Estás seguro de que deseas eliminar "${deleteTarget?.name}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        loading={deleteLoading}
      />
    </div>
  );
}
