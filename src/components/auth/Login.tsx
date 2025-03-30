import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function login() {
    if (formData.email !== "" && formData.password !== "" && formData.password.length >= 8) {
      const database = JSON.parse(localStorage.getItem("database") || "[]");

      database.filter((user: { id: string; email: string; password: string; tasks: [] }) => {
        if (user.email === formData.email && user.password === formData.password) {
          localStorage.setItem("userId", user.id);
        }
      });

      navigate("/");
    }
  }

  return (
    <section className="container m-auto flex justify-center items-center h-screen">
      <form
        className="w-full max-w-sm p-5 bg-white rounded shadow-md"
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}
      >
        <h2 className="text-2xl font-bold mb-5">Login</h2>

        <label className="block mb-3 font-bold text-lg" htmlFor="email">
          Email
        </label>
        <input onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="block mb-3 border outline-none p-3 w-full rounded" type="email" id="email" autoFocus required />

        <label className="block mb-3 font-bold text-lg" htmlFor="password">
          Password
        </label>
        <input onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="block mb-3 border outline-none p-3 w-full rounded" type="password" id="password" required />

        <button type="submit" className="bg-blue-500 cursor-pointer text-white p-3 rounded w-full mt-5">
          Login
        </button>
        <p className="mt-5 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Sign Up
          </Link>
        </p>
      </form>
    </section>
  );
}
