import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../CartContext";

function ProductDetail() {
  const { id } = useParams();
  const { addToCart, addToWishlist } = useCart();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <p style={{ textAlign: "center", padding: "40px" }}>Loading...</p>;

  return (
    <div className="detail-page">
      <div className="detail-container">
        <img src={product.image} alt={product.name} className="detail-img" />
        <div className="detail-info">
          <p className="product-category">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="detail-price">Rs. {product.price}</p>
          <p className="detail-desc">{product.description}</p>
          <div className="detail-buttons">
            <button className="btn-cart" onClick={() => addToCart(product)}>Add to Cart</button>
            <button className="btn-wish" onClick={() => addToWishlist(product)}>♡ Wishlist</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;