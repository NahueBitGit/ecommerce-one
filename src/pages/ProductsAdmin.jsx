import { useProducts } from "../contexts/ProductsContext";
import ProductForm from "../components/ProductForm";
import DeleteModal from "../components/DeleteModal";
import Layout from "../components/Layout";
import { useState } from "react";
import styled from "styled-components";
import Pagination from "../components/Pagination";

import { FaPlus, FaSync, FaEdit, FaTrash, FaStar } from "react-icons/fa";

import {
  notifySuccess,
  notifyError,
  notifyInfo,
  notifyWarning,
} from "../toast";

const ProductsAdmin = () => {
  const {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProduct,
    fetchProducts,
  } = useProducts();

  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.category || "").toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(start, start + itemsPerPage);
  // -----------------------

  const handleCreateClick = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditClick = (p) => {
    setEditingProduct(p);
    setShowForm(true);
  };

  const handleFormSubmit = async (payload) => {
    if (editingProduct) {
      const res = await updateProduct(editingProduct.id, payload);
      if (res.ok) {
        notifyInfo("Producto actualizado");
        setShowForm(false);
      } else {
        notifyError(res.message || "Error al actualizar");
      }
      return res;
    } else {
      const res = await createProduct(payload);
      if (res.ok) {
        notifySuccess("Producto creado");
        setShowForm(false);
      } else {
        notifyError(res.message || "Error al crear");
      }
      return res;
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);

    const res = await deleteProduct(deleteTarget.id);
    setDeleteLoading(false);

    if (res.ok) {
      notifyWarning("Producto eliminado");
      setDeleteTarget(null);
    } else {
      notifyError(res.message || "Error al eliminar");
    }
  };

  const toggleFeatured = async (product) => {
    const newValue = !product.featured;

    const res = await updateProduct(product.id, { featured: newValue });

    if (res.ok) {
      notifySuccess(
        newValue
          ? `“${product.name}” marcado como destacado ⭐`
          : `“${product.name}” ya no es destacado`
      );
    } else {
      notifyError("No se pudo actualizar el estado de destacado");
    }
  };

  return (
    <div style={{ padding: 20 }}>

      <Layout title="Administración" description="Administración de Productos">

      <h1>Administración de Productos</h1>

      <input
        type="text"
        placeholder="Buscar por nombre o categoría..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        style={{ padding: 6, marginBottom: 12, width: 250 }}
      />

      <div style={{ marginBottom: 12 }}>
        <button onClick={handleCreateClick}>
          <FaPlus style={{ marginRight: 6 }} />
          Nuevo producto
        </button>

        <button onClick={fetchProducts} style={{ marginLeft: 8 }}>
          <FaSync style={{ marginRight: 6 }} />
          Refrescar
        </button>
      </div>

      {loading && <div>Cargando productos...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}

      {!loading && paginated.length === 0 && (
        <div>No hay productos que coincidan.</div>
      )}

    <Grid>
     {paginated.map((p) => (
        <Card key={p.id}>
         <Image src={p.image} />
          <h3>{p.name}</h3>
          <p>{p.category}</p>
          <p><strong>${p.price}</strong></p>
          <div style={{ marginTop: 10 }}>
            <button onClick={() => handleEditClick(p)}>
              <FaEdit /> Editar
            </button>
            <button onClick={() => setDeleteTarget(p)} style={{ marginLeft: 8 }}>
              <FaTrash /> Eliminar
            </button>
          </div>

         <label style={{ display: "flex", justifyContent: "center", gap: 6 }}>
           <input
             type="checkbox"
             checked={!!p.featured}
             onChange={() => toggleFeatured(p)}
           />
           <FaStar color={p.featured ? "gold" : "#ccc"} />
          </label>
        </Card>
     ))}
    </Grid>

    <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
    />

      {showForm && (
        <div
          style={{
            marginTop: 20,
            padding: 12,
            border: "1px solid #ccc",
            borderRadius: 6,
          }}
        >

          <ProductForm
            initialData={editingProduct}
            onSubmit={handleFormSubmit}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      <DeleteModal
        open={!!deleteTarget}
        title="Eliminar producto"
        message={
          deleteTarget
            ? `Vas a eliminar "${deleteTarget.name}". Esta acción NO se puede deshacer.`
            : ""
        }
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
        loading={deleteLoading}
      />
      </Layout>
    </div>
  );
};

export default ProductsAdmin;
const Grid = styled.div`
  margin-top: 25px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
  background: #f7faff;
  border: 1px solid #d0d8ff;
  border-radius: 14px;
  box-shadow: 0 4px 10px rgba(0, 0, 40, 0.08);
  padding: 16px;
  text-align: center;
`;

const Image = styled.img`
  width: 100%;
  height: 140px;
  object-fit: contain;
  background: white;
  border-radius: 8px;
  padding: 10px;
`;
