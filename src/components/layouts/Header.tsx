import { useNavigate } from "react-router";

export default function Header() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("userId");
    navigate("/login");
  }

  return (
    <header className="border">
      <div className="container m-auto flex justify-between items-center pt-5 pb-5">
        <span className="font-bold">Todo List</span>
        <div className="flex gap-5">
          {localStorage.getItem("userId") && (
            <button onClick={logout} className="bg-red-500 rounded p-2 text-white font-bold cursor-pointer">
              Logout
            </button>
          )}
          <button>
            <img src="/dark.png" alt="dark mode" />
          </button>
        </div>
      </div>
    </header>
  );
}
