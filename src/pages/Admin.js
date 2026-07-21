import { useState, useEffect } from "react";

function Admin() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "", price: "", category: "", image: "", description: ""
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
        setForm({ name: "", price: "", category: "", image: "", description: "" });
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
              <p>Rs. {p.price} — {p.category}</p>
            </div>
            <button className="btn-remove" onClick={() => deleteProduct(p._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;