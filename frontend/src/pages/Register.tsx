import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../backend/Auth";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", password_confirmation: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (submitEvent: React.SubmitEvent) => {
    // stop default browser form submission since we want to not have the browser refresh the page
    submitEvent.preventDefault();

    try {
      const res = await axiosInstance.post("/register", form);
      
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } 
    catch {
      setError("Couldn't create account. Check your information.");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        {/* banner in case we need to tell the user something went wrong */}
        {error && <div className="error-banner">{error}</div>}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              required
            />
          </div>

          <div className="field">
            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
              required
            />
          </div>

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
              required
            />
          </div>

          <div className="field">
            <label>Confirm Password</label>
            <input
              type="password"
              value={form.password_confirmation}
              onChange={(event) => setForm({ ...form, password_confirmation: event.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn-primary">
            {"Create account"}
          </button>
        </form>

        <p className="auth-switch">
          Already got an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
