export default function Header() {
  return (
    <header className="border">
      <div className="container m-auto flex justify-between items-center pt-5 pb-5">
        <span className="font-bold">Todo List</span>
        <button>
          <img src="/dark.png" alt="dark mode" />
        </button>
      </div>
    </header>
  );
}
