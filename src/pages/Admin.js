import { useState, useEffect } from "react";

function Admin() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "", price: "", category: "", image: "", description: "",
    style: "", fabric: "", season: "", sizes: []
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSizes = (e) => {
    const selected = Array.from(e.target.selectedOptions, opt => opt.value);
    setForm({ ...form, sizes: selected });
  };

  const addProduct = () => {
    fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts([...products, data]);
        setForm({ name: "", price: "", category: "", image: "", description: "", style: "", fabric: "", season: "", sizes: [] });
        alert("Product added!");
      });
  };

  const deleteProduct = (id) => {
    fetch(`http://localhost:5000/api/products/${id}`, { method: "DELETE" })
      .then(() => setProducts(products.filter((p) => p._id !== id)));
  };

  return (
    <div className="products-page">
      <h2 className="page-title">Admin Panel</h2>

      <div className="admin-form">
        <h3>Add New Product</h3>
        <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} />
        <input name="price" placeholder="Price" value={form.price} onChange={handleChange} />
        
        <select name="category" value={form.category} onChange={handleChange}>
          <option value="">Select Category</option>
          <option value="Women">Women</option>
          <option value="Men">Men</option>
          <option value="Kids">Kids</option>
        </select>

        <select name="style" value={form.style} onChange={handleChange}>
          <option value="">Select Style</option>
          <option value="Casual">Casual</option>
          <option value="Formal">Formal</option>
          <option value="Ethnic">Ethnic</option>
          <option value="Western">Western</option>
          <option value="Sporty">Sporty</option>
        </select>

        <select name="fabric" value={form.fabric} onChange={handleChange}>
          <option value="">Select Fabric</option>
          <option value="Cotton">Cotton</option>
          <option value="Silk">Silk</option>
          <option value="Linen">Linen</option>
          <option value="Chiffon">Chiffon</option>
        </select>

        <select name="season" value={form.season} onChange={handleChange}>
          <option value="">Select Season</option>
          <option value="Summer">Summer</option>
          <option value="Winter">Winter</option>
          <option value="Spring">Spring</option>
          <option value="Autumn">Autumn</option>
                    <option value="All Seasons">All Seasons</option>

        </select>

        <select multiple name="sizes" onChange={handleSizes} style={{ height: "100px" }}>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
        <p style={{ fontSize: "12px", color: "#5c4033" }}>Hold Ctrl to select multiple sizes</p>

        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        
        <button className="btn-cart" onClick={addProduct}>Add Product</button>
      </div>

      <h3 className="section-title">All Products ({products.length})</h3>
      <div className="admin-list">
        {products.map((p) => (
          <div key={p._id} className="admin-item">
            <img src={p.image} alt={p.name} />
            <div className="admin-info">
              <h4>{p.name}</h4>
              <p>Rs. {p.price} — {p.category} — {p.style} — {p.fabric} — {p.season}</p>
              <p>Sizes: {p.sizes && p.sizes.join(", ")}</p>
            </div>
            <button className="btn-remove" onClick={() => deleteProduct(p._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;