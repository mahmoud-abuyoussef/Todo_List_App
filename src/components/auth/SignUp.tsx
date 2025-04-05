import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link, useNavigate } from "react-router";

interface Task {
  id: string;
  title: string;
  description: string;
  dateAndTime: string;
  isCompleted: boolean;
}

interface User {
  id: string;
  email: string;
  password: string;
  tasks: Task[];
}

export default function SignUp({ database, setDatabase }: { database: User[]; setDatabase: (newDatabase: User[]) => void }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function signUp() {
    const isUserExist = database.some((user: User) => {
      if (user.email === formData.email) {
        return true;
      }
    });

    if (!isUserExist) {
      const newUser = [
        ...database,
        {
          id: uuidv4(),
          email: formData.email,
          password: formData.password,
          tasks: [],
        },
      ];

      localStorage.setItem("database", JSON.stringify(newUser));

      setDatabase(newUser);

      navigate("/login");
    }
  }

  return (
    <section className="container m-auto flex justify-center items-center h-screen">
      <form
        className="w-full max-w-sm p-5 bg-white rounded shadow-md"
        onSubmit={(e) => {
          e.preventDefault();
          signUp();
        }}
      >
        <h2 className="text-2xl font-bold mb-5">Sign Up</h2>

        <label className="block mb-3 font-bold text-lg" htmlFor="email">
          Email
        </label>
        <input onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="block mb-3 border outline-none p-3 w-full rounded" type="email" id="email" autoFocus required />

        <label className="block mb-3 font-bold text-lg" htmlFor="password">
          Password
        </label>
        <input
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="block mb-3 border outline-none p-3 w-full rounded"
          minLength={8}
          type="password"
          id="password"
          required
        />

        <button type="submit" className="bg-blue-500 cursor-pointer text-white p-3 rounded w-full mt-5">
          Sign Up
        </button>

        <p className="mt-5 text-center">
          Already have an account?
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </section>
  );
}
