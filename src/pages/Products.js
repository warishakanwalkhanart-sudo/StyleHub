import { useState, useEffect } from "react";
import { useCart } from "../CartContext";
import { useNavigate } from "react-router-dom";

function Products() {
  const { addToCart, addToWishlist } = useCart();
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const filtered = products
    .filter((p) => selected === "All" || p.category === selected)
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <p style={{ textAlign: "center", padding: "40px" }}>Loading products...</p>;

  return (
    <div className="products-page">
      <h2 className="page-title">Our Collection</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

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
        {filtered.length === 0 ? (
          <p style={{ textAlign: "center", color: "#5c4033" }}>No products found!</p>
        ) : (
          filtered.map((product) => (
            <div key={product._id} className="product-card">
              <img
                src={product.image}
                alt={product.name}
                onClick={() => navigate(`/product/${product._id}`)}
                style={{ cursor: "pointer" }}
              />
              <div className="product-info">
                <p className="product-category">{product.category}</p>
                <h3 onClick={() => navigate(`/product/${product._id}`)} style={{ cursor: "pointer" }}>
                  {product.name}
                </h3>
                <p className="product-price">Rs. {product.price}</p>
                <div className="product-buttons">
                  <button className="btn-cart" onClick={() => addToCart(product)}>
                    Add to Cart
                  </button>
                  <button className="btn-wish" onClick={() => addToWishlist(product)}>♡</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Products;