import { useState } from "react";
import { useCart } from "../CartContext";

const products = [
  { id: 1, name: "Elegant Suit", price: 5999, category: "Women", image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=400" },
  { id: 2, name: "Casual Frock", price: 2999, category: "Women", image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400" },
  { id: 3, name: "Men's Coat", price: 7999, category: "Men", image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400" },
  { id: 4, name: "Kids Dress", price: 1999, category: "Kids", image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400" },
  { id: 5, name: "Summer Top", price: 1499, category: "Women", image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=400" },
  { id: 6, name: "Formal Shirt", price: 3499, category: "Men", image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=400" },
];

function Products() {
  const { addToCart, addToWishlist } = useCart();
  const [selected, setSelected] = useState("All");

  const filtered = selected === "All" 
    ? products 
    : products.filter((p) => p.category === selected);

  return (
    <div className="products-page">
      <h2 className="page-title">Our Collection</h2>
      
      <div className="filter-buttons">
        {["All", "Women", "Men", "Kids"].map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${selected === cat ? "active" : ""}`}
            onClick={() => setSelected(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="products-grid">
        {filtered.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <div className="product-info">
              <p className="product-category">{product.category}</p>
              <h3>{product.name}</h3>
              <p className="product-price">Rs. {product.price}</p>
              <div className="product-buttons">
                <button className="btn-cart" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
                <button className="btn-wish" onClick={() => addToWishlist(product)}>♡</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;