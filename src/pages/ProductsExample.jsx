import { useEffect, useState } from "react";
import { useProducts } from "../contexts/ProductsContext";
import { useCart } from "../contexts/CartContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { FaCartPlus } from "react-icons/fa";
import Layout from "../components/Layout";
import styled from "styled-components";

const ProductsExample = () => {
  const { products, loading, error, fetchProducts } = useProducts();
  const { addToCart } = useCart();

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 6;

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = [...new Set(products.map((p) => p.category))];

  const filteredProducts = products
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((p) => (categoryFilter ? p.category === categoryFilter : true));

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLast = currentPage * productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfLast - productsPerPage,
    indexOfLast
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter]);

  const handleAdd = (product) => {
    addToCart(product, 1);
    toast.success(`"${product.name}" agregado al carrito`);
  };

  return (
    <Layout title="Productos" description="Listado de productos">

      <h1 style={{ marginBottom: 20 }}>Productos</h1>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        categories={categories}
      />

      {loading && <p>Cargando productos...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && filteredProducts.length === 0 && (
        <p>No hay productos que coincidan con la búsqueda.</p>
      )}

      <Grid>
        {currentProducts.map((p) => (
          <Card key={p.id}>
            <Image src={p.image} alt={p.name} />

            <h3>{p.name}</h3>
            <p className="price">${p.price}</p>
            <p className="desc">{p.description}</p>

            <LinkButton to={`/product/${p.id}`}>Ver detalle</LinkButton>

            <AddButton onClick={() => handleAdd(p)}>
              <FaCartPlus /> Agregar
            </AddButton>
          </Card>
        ))}
      </Grid>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(n) => setCurrentPage(n)}
        />
      )}
    </Layout>
  );
};

export default ProductsExample;

const Grid = styled.div`
  margin-top: 25px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 20px;
`;

const LinkButton = styled(Link)`
  display: inline-block;
  margin-top: 8px;
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

const Card = styled.div`
  background: #f7faff;
  border: 1px solid #d0d8ff;
  box-shadow: 0 4px 10px rgba(0, 0, 40, 0.08);
  border-radius: 14px;
  padding: 16px;
  text-align: center;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
  }

  h3 {
    margin-top: 10px;
    color: #004aad;
    font-size: 20px;
  }

  .price {
    font-size: 18px;
    font-weight: bold;
    color: #00337a;
  }

  .desc {
    font-size: 14px;
    color: #333;
    height: 40px;
    overflow: hidden;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 140px;
  object-fit: contain;
  padding: 10px;
  background: white;
  border-radius: 8px;
`;

const AddButton = styled.button`
  margin-top: auto;
  padding: 10px;
  border-radius: 10px;
  background: #004aad;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  gap: 8px;
  cursor: pointer;

  &:hover {
    background: #00337a;
  }
`;

