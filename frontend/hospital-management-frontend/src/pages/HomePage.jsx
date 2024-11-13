import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/HomePage.css";
import "bootstrap/dist/css/bootstrap.min.css";

function HomePage() {
  return (
    <div className="home-page">
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <div className="container">
          {/* Logo and brand */}
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <img
              src={`${process.env.PUBLIC_URL}/website logo.png`} // Correct image path
              alt="LifeBridge Hospital Logo"
              className="Navbarlogo me-2" // Adjust margin on the right to space logo and text
              style={{ maxWidth: '50px', maxHeight: '50px' }} // You can tweak logo size as per design
            />
            <span>LifeBridge Hospital</span>
          </Link>

          {/* Toggler for mobile view */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto"> {/* ms-auto aligns links to the right */}
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero py-5 text-center bg-light">
        <div className="container">
          <h1 className="display-4">Welcome to Our LifeBridge Hospital</h1>
          <p className="lead">Manage your hospital records efficiently and securely.</p>
          <Link to="/register" className="btn btn-primary btn-lg mt-3"> {/* Call-to-action button */}
            Get Started
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="features py-5">
        <div className="container text-center">
          <h2 className="mb-4">Key Features</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="feature-item">
                <h3>Patient Management</h3>
                <p>Easily manage patient records and appointments.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-item">
                <h3>Doctor Management</h3>
                <p>Assign doctors to patients and manage their schedules.</p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-item">
                <h3>Billing and Payments</h3>
                <p>Track bills, payments, and financial reports seamlessly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer py-4 bg-dark text-white text-center">
        <div className="container">
          <p>&copy; 2024 LifeBridge Hospital. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
