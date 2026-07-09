import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="hero">
      <div className="hero-text">
        <h1>Welcome to <span>StyleHub</span></h1>
        <p>Discover your fashion identity & shop the latest trend</p>
        <button className="hero-btn" onClick={() => navigate("/products")}>
          Shop Now →
        </button>
      </div>
    </div>
  );
}

export default Home;