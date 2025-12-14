import { createContext, useState, useContext, useEffect } from "react";
import { API_BASE } from "../config/api";

const ProductsContext = createContext();

const normalizeProduct = (product) => {
  return {
    id: product.id,
    name: product.name || product.title || "",
    price: product.price || 0,
    image: product.image || product.img || "",
    description: product.description || product.desc || "",
    category: product.category || "",
    featured: product.featured || false,
  };
};

const normalizeProducts = (products) => {
  return Array.isArray(products) ? products.map(normalizeProduct) : [];
};

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      setProducts(normalizeProducts(data));
    } catch (err) {
      console.error("fetchProducts:", err);
      setError(err.message || "Error al obtener productos");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (product) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const created = await res.json();
      const normalized = normalizeProduct(created);
      setProducts((p) => [normalized, ...p]);
      return { ok: true, data: normalized };
    } catch (err) {
      console.error("createProduct:", err);
      setError(err.message || "Error al crear producto");
      return { ok: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id, updates) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const updated = await res.json();
      const normalized = normalizeProduct(updated);
      setProducts((p) => p.map(pr => pr.id === id ? normalized : pr));
      return { ok: true, data: normalized };
    } catch (err) {
      console.error("updateProduct:", err);
      setError(err.message || "Error al actualizar producto");
      return { ok: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      setProducts((p) => p.filter(pr => pr.id !== id));
      return { ok: true };
    } catch (err) {
      console.error("deleteProduct:", err);
      setError(err.message || "Error al eliminar producto");
      return { ok: false, message: err.message };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{
      products,
      loading,
      error,
      fetchProducts,
      createProduct,
      updateProduct,
      deleteProduct
    }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
