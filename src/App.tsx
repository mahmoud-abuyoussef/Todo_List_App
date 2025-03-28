import { useState } from "react";
import Home from "./components/Home";
import Login from "./components/auth/Login";
import NotFound from "./components/NotFound";
import SignUp from "./components/auth/SignUp";
import { ToastContainer } from "react-toastify";
import Header from "./components/layouts/Header";
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  const [database, setDatabase] = useState([]);

  return (
    <>
      <ToastContainer />
      <Header />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home database={database} setDatabase={setDatabase} />} />
          <Route path="/signup" element={<SignUp database={database} setDatabase={setDatabase} />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
