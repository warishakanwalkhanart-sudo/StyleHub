import { useCart } from "../CartContext";

function Cart() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="products-page">
      <h2 className="page-title">My Cart</h2>
      {cart.length === 0 ? (
        <p style={{ textAlign: "center", color: "#5c4033" }}>Your cart is empty!</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-info">
                <h3>{item.name}</h3>
                <p>Rs. {item.price}</p>
              </div>
              <button className="btn-remove" onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </div>
          ))}
          <div className="cart-total">
            <h3>Total: Rs. {total}</h3>
            <button className="hero-btn">Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;