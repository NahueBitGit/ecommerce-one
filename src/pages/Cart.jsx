import { useCart } from '../contexts/CartContext';
import Layout from '../components/Layout';
import { toast } from "react-toastify";
import { FaTrash, FaPlus, FaMinus, FaTrashAlt } from "react-icons/fa";
import styled from "styled-components";

const FORMSPREE_URL = "https://formspree.io/f/xblnqpjd";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, cartQuantity } = useCart();

  const handleRemove = (id, title) => {
    removeFromCart(id);
    toast.info(`"${title}" fue eliminado del carrito`);
  };

  const handleQuantity = (id, currentQty, type) => {
    let newQty = currentQty;

    if (type === "inc") newQty++;
    if (type === "dec" && currentQty > 1) newQty--;

    updateQuantity(id, newQty);
    toast.success("Cantidad actualizada");
  };

  const handleClearCart = () => {
    clearCart();
    toast.warn("Carrito vaciado");
  };

  const carritoLegible =
    "🛒 CARRITO DE COMPRA\n\n" +
    cart.map(item => (
      `• ${item.name || item.title}
  Categoría: ${item.category}
  Cantidad: ${item.quantity}
  Precio unitario: $${item.price}
  Subtotal: $${(item.price * item.quantity).toFixed(2)}\n`
    )).join("\n") +
    `\nTOTAL FINAL: $${cartTotal.toFixed(2)}\n`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();
    const telefono = form.telefono.value.trim();
    const direccion = form.direccion.value.trim();
    const mensaje = form.mensaje.value.trim();

    if (!nombre || !email || !telefono || !direccion) {
      toast.error("Por favor completa todos los campos obligatorios");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("El email no es válido");
      return;
    }

    if (!/^[0-9]{6,20}$/.test(telefono)) {
      toast.error("El teléfono debe contener solo números (mínimo 6 dígitos)");
      return;
    }

    toast.info("Enviando pedido...");

    const data = {
      nombre,
      email,
      telefono,
      direccion,
      mensaje,
      carrito: carritoLegible,
      total: cartTotal.toFixed(2),
    };

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("Pedido enviado correctamente 🎉");
        form.reset();
      } else {
        toast.error("Ocurrió un error al enviar el pedido 😥");
      }

    } catch (error) {
      toast.error("Error de conexión al enviar el formulario");
    }
  };

  return (
    <Layout title="Carrito" description="Tu carrito de compras">
      <Container>

        {cart.length === 0 ? (
          <EmptyMsg>Tu carrito está vacío</EmptyMsg>
        ) : (
          <>
            <h1>Carrito ({cartQuantity} productos)</h1>

            <Grid>
              {cart.map(item => (
                <Card key={item.id}>
                  <Img src={item.image || "/placeholder.png"} />

                  <h3>{item.name}</h3>
                  <p><strong>${item.price}</strong></p>

                  <QtyRow>
                    <button onClick={() => handleQuantity(item.id, item.quantity, "dec")} aria-label={`Disminuir cantidad de ${item.name}`}>
                      <FaMinus aria-hidden="true" />
                    </button>

                    <span>{item.quantity}</span>

                    <button onClick={() => handleQuantity(item.id, item.quantity, "inc")} aria-label={`Aumentar cantidad de ${item.name}`}>
                      <FaPlus aria-hidden="true" />
                    </button>
                  </QtyRow>

                  <RemoveBtn onClick={() => handleRemove(item.id, item.name)} aria-label={`Quitar ${item.name} del carrito`}>
                    <FaTrash aria-hidden="true" /> Quitar
                  </RemoveBtn>
                </Card>
              ))}
            </Grid>

            <Total>Total: ${cartTotal.toFixed(2)}</Total>

            <ClearButton onClick={handleClearCart}>
              <FaTrashAlt /> Vaciar carrito
            </ClearButton>

            <hr />

            <h2>Finalizar pedido</h2>

            <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>

              <label>Nombre</label>
              <input type="text" name="nombre" />

              <label>Email</label>
              <input type="email" name="email" />

              <label>Teléfono</label>
              <input type="text" name="telefono" />

              <label>Dirección de entrega</label>
              <input type="text" name="direccion" />

              <label>Mensaje adicional</label>
              <textarea name="mensaje" rows="3"></textarea>

              <SubmitBtn type="submit">Enviar pedido</SubmitBtn>
            </form>
          </>
        )}

      </Container>
    </Layout>
  );
};

export default Cart;


const Container = styled.div`
  padding: 20px;

  input, textarea {
    width: 100%;
    padding: 10px;
    margin: 6px 0 12px;
    border-radius: 6px;
    border: 1px solid #ccc;
  }
`;

const EmptyMsg = styled.h2`
  text-align: center;
  margin-top: 40px;
`;

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

const Img = styled.img`
  width: 100%;
  height: 140px;
  object-fit: contain;
  background: white;
  border-radius: 8px;
  padding: 10px;
`;

const QtyRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin: 10px 0;

  button {
    background: #eee;
    border: 1px solid #999;
    padding: 6px 10px;
    cursor: pointer;
    border-radius: 6px;
  }

  span {
    font-weight: bold;
    width: 30px;
    text-align: center;
  }
`;

const RemoveBtn = styled.button`
  margin-top: 8px;
  padding: 8px 12px;
  background: #d62828;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const Total = styled.div`
  font-size: 1.4rem;
  margin-top: 16px;
  font-weight: bold;
`;

const ClearButton = styled.button`
  margin-top: 10px;
  padding: 8px 12px;
  background: #6a040f;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;

const SubmitBtn = styled.button`
  width: 100%;
  margin-top: 16px;
  padding: 12px;
  background: #0b5ed7;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.1rem;
`;
