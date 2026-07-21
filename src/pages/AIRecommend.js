import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AIRecommend() {
  const [form, setForm] = useState({
    occasion: "Casual",
    budget: "3000",
    color: "Dark",
    gender: "Women",
    season: "Summer",
    style: "Casual",
    size: "M",
    fabric: "Cotton"
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getRecommendations = async () => {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const res = await fetch("http://localhost:5000/api/ai/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.products) {
        setResult(data);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Cannot connect to server. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="products-page">
      <h2 className="page-title">AI Style Advisor</h2>
      <p style={{ textAlign: "center", color: "#5c4033", marginBottom: "30px" }}>
        Tell us your preferences and our AI will recommend the perfect outfit!
      </p>

      <div className="ai-form">
        <div className="ai-field">
          <label>Gender</label>
          <select name="gender" value={form.gender} onChange={handleChange}>
            <option value="Women">Women</option>
            <option value="Men">Men</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div className="ai-field">
          <label>Occasion</label>
          <select name="occasion" value={form.occasion} onChange={handleChange}>
            <option value="Casual">Casual</option>
            <option value="Wedding">Wedding</option>
            <option value="Office">Office</option>
            <option value="Party">Party</option>
          </select>
        </div>

        <div className="ai-field">
          <label>Season</label>
          <select name="season" value={form.season} onChange={handleChange}>
            <option value="Summer">Summer</option>
            <option value="Winter">Winter</option>
            <option value="Spring">Spring</option>
            <option value="Autumn">Autumn</option>
          </select>
        </div>

        <div className="ai-field">
          <label>Style</label>
          <select name="style" value={form.style} onChange={handleChange}>
            <option value="Casual">Casual</option>
            <option value="Formal">Formal</option>
            <option value="Ethnic">Ethnic</option>
            <option value="Western">Western</option>
            <option value="Sporty">Sporty</option>
          </select>
        </div>

        <div className="ai-field">
          <label>Size</label>
          <select name="size" value={form.size} onChange={handleChange}>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>

        <div className="ai-field">
          <label>Fabric Preference</label>
          <select name="fabric" value={form.fabric} onChange={handleChange}>
            <option value="Cotton">Cotton</option>
            <option value="Silk">Silk</option>
            <option value="Linen">Linen</option>
            <option value="Chiffon">Chiffon</option>
            <option value="Any">No Preference</option>
          </select>
        </div>

        <div className="ai-field">
          <label>Budget (Rs.)</label>
          <select name="budget" value={form.budget} onChange={handleChange}>
            <option value="2000">Under Rs. 2000</option>
            <option value="4000">Rs. 2000 - 4000</option>
            <option value="6000">Rs. 4000 - 6000</option>
            <option value="10000">Rs. 6000+</option>
          </select>
        </div>

        <div className="ai-field">
          <label>Color Preference</label>
          <select name="color" value={form.color} onChange={handleChange}>
            <option value="Dark">Dark Colors</option>
            <option value="Light">Light Colors</option>
            <option value="Bright">Bright Colors</option>
            <option value="Any">No Preference</option>
          </select>
        </div>

        <button className="btn-cart" onClick={getRecommendations} disabled={loading}>
          {loading ? "AI is thinking..." : "Get Recommendations"}
        </button>
      </div>

      {error && (
        <p style={{ textAlign: "center", color: "red", marginTop: "20px" }}>{error}</p>
      )}

      {result && (
        <div className="ai-results">
          <h3 className="section-title">AI Recommendations</h3>
          {result.products.length > 0 ? (
            <div className="products-grid">
              {result.products.map((product) => (
                <div key={product._id} className="product-card">
                  <img
                    src={product.image}
                    alt={product.name}
                    onClick={() => navigate("/product/" + product._id)}
                    style={{ cursor: "pointer" }}
                  />
                  <div className="product-info">
                    <p className="product-category">{product.category}</p>
                    <h3>{product.name}</h3>
                    <p className="product-price">Rs. {product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: "center", color: "#5c4033" }}>
              No exact matches found. Try different preferences!
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default AIRecommend;