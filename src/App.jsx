import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider as StyledTheme } from "styled-components";

import { useThemeMode } from "./contexts/ThemeContext";
import { lightTheme, darkTheme } from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";

import PrivateRoute from "./components/PrivateRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import ProductsExample from "./pages/ProductsExample";
import ProductsAdmin from "./pages/ProductsAdmin";
import ProductDetail from "./pages/ProductDetail";

function App() {
  const { darkMode } = useThemeMode();

  return (
    <StyledTheme theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyle />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<ProductsExample />} />
          <Route path="/product/:id" element={<ProductDetail />} />

          {/* Rutas protegidas */}
          <Route element={<PrivateRoute />}>
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin/products" element={<ProductsAdmin />} />
          </Route>

          {/* 404 */}
          <Route
            path="*"
            element={<div style={{ padding: 20 }}>404 - Not Found</div>}
          />
        </Routes>
      </BrowserRouter>
    </StyledTheme>
  );
}

export default App;

