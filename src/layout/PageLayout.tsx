import { Link, NavLink, Outlet } from "react-router";

export default function PageLayout() {
  return (
    <>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl">
              Muslims
            </Link>
          </div>

          <div className="hidden md:flex space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  : "text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              }
            >
              Jadwal Sholat
            </NavLink>
            <NavLink
              to="/quran"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  : "text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              }
            >
              Quran
            </NavLink>
            <NavLink
              to="/asmaul-husna"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-500 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  : "text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              }
            >
              Asmaul Husna
            </NavLink>

            {/* <a
              href="#"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Services
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Contact
            </a> */}
          </div>

          <div className="md:hidden">
            <button
              id="mobile-menu-button"
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              MENUS
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          className="hidden md:hidden space-y-2 px-2 pt-2 pb-3 sm:px-3"
        >
          <a
            href="#"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
          >
            Home
          </a>
        </div>
      </nav>
      <div className="px-20 my-5">
        <Outlet />
      </div>
    </>
  );
}
