import { useState } from "react";
import { Header, Footer } from "./common";
import { CarList } from "./modules/cars";
import { RecommendationList } from "./modules/recommendations";
import "./App.css";

type PageType = "home" | "cars" | "recommendations";

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("home");

  return (
    <div className="app">
      <Header />
      
      <main className="main-content">
        {currentPage === "home" && (
          <div className="home-page">
            <div className="hero">
              <h2>Welcome to Car Recommendation Platform</h2>
              <p>Find the perfect car that matches your preferences</p>
              <div className="hero-buttons">
                <button 
                  className="btn-primary-large"
                  onClick={() => setCurrentPage("recommendations")}
                >
                  Get Recommendations
                </button>
                <button 
                  className="btn-secondary-large"
                  onClick={() => setCurrentPage("cars")}
                >
                  Browse All Cars
                </button>
              </div>
            </div>
          </div>
        )}

        {currentPage === "cars" && <CarList />}
        {currentPage === "recommendations" && <RecommendationList />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
