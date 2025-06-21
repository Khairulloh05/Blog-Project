import { useState } from "react";
import { Link } from 'react-router-dom';
import "./Form.css";

const RegisterForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('https://blogmusi.pythonanywhere.com/api/v1/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Registration failed');
      }

      const result = await response.text();
      console.log("Server Response:", result);
      alert("Successfully registered!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Sign Up</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="register-input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="register-input"
            required
          />
          <div className="form-btns">
            <button type="submit" className="register-button" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
            <Link to="/Home">
              <span className="register-button">Next</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
