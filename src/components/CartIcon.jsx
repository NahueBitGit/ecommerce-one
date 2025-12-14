import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../contexts/CartContext";
import { Link } from "react-router-dom";

export default function CartIcon() {
  const { cartQuantity } = useCart();

  return (
    <Link
      to="/cart"
      aria-label={`Ver carrito (${cartQuantity} artículos)`}
      style={{ display: "flex", alignItems: "center", gap: 4 }}
    >
      <FaShoppingCart aria-hidden="true" />
      <span>({cartQuantity})</span>
    </Link>
  );
}
