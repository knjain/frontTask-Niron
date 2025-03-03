import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar.jsx";

const Layout = () => {
  return (
    <div>
      <Navbar />  {/* ✅ Navbar on top */}
      <main className="p-6">
        <Outlet />  {/* ✅ This will render the current page (Dashboard, etc.) */}
      </main>
    </div>
  );
};

export default Layout;
