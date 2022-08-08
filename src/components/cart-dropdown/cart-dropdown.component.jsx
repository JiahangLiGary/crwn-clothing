import { useSelector } from "react-redux/es/exports";
import { selectCartItems } from "../../store/cart/cart.selector";
import { useNavigate } from "react-router-dom";
import Button from "../button/button.component";

import "./cart-dropdown.styles.scss";
import CartItem from "../cart-item/cart-item.component";
const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();
  const gotocheckoutHandler = () => {
    navigate("./checkout");
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item}></CartItem>
        ))}
      </div>
      <Button onClick={gotocheckoutHandler} children={"check out"}></Button>
    </div>
  );
};

export default CartDropdown;
