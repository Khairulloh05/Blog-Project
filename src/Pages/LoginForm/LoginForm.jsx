import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Form.css'

const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  // console.log(form);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://blogmusi.pythonanywhere.com/api/v1/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      // console.log("LOGIN RESPONSE:", data);
      if (!response.ok) throw new Error(data.detail || "Login failed");
      // Сохраняем токен в браузер
      localStorage.setItem("accessToken", data.token);
      navigate('/Home');
      // alert("Login successful!");
    } catch (err) {
      // alert("Something went wrong!");
      alert("Ошибка входа: " + err.message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Sign up</h2 >
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
          <button type="submit" className="register-button">Sign up</button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm