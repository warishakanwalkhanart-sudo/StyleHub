import { useCart } from "../CartContext";

function Wishlist() {
  const { wishlist, removeFromWishlist, addToCart } = useCart();

  return (
    <div className="products-page">
      <h2 className="page-title">My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p style={{ textAlign: "center", color: "#5c4033" }}>Your wishlist is empty!</p>
      ) : (
        <div className="products-grid">
          {wishlist.map((item, index) => (
            <div key={index} className="product-card">
              <img src={item.image} alt={item.name} />
              <div className="product-info">
                <p className="product-category">{item.category}</p>
                <h3>{item.name}</h3>
                <p className="product-price">Rs. {item.price}</p>
                <div className="product-buttons">
                  <button className="btn-cart" onClick={() => addToCart(item)}>
                    Add to Cart
                  </button>
                  <button className="btn-wish" onClick={() => removeFromWishlist(item.id)}>
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;