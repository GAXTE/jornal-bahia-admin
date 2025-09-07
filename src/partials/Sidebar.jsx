import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";

import {
  FolderArchive,
  LayoutDashboard,
  Newspaper,
  Receipt,
  Tags,
  Users2,
} from "lucide-react";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? "true" : storedSidebarExpanded === false
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 sm:w-72 lg:w-20 lg:sidebar-expanded:!w-64 xl:sidebar-expanded:!w-72 shrink-0 bg-slate-800 p-3 sm:p-4 lg:p-3 xl:p-4 transition-all duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        } 2xl:w-auto`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-6 sm:mb-8 lg:mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400 p-1 -ml-1 rounded-md transition-colors duration-200"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          <NavLink end to="/dashboard" className="block">
            <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 32 32">
              <defs>
                <linearGradient
                  x1="28.538%"
                  y1="20.229%"
                  x2="100%"
                  y2="108.156%"
                  id="logo-a"
                >
                  <stop stopColor="#e50000" stopOpacity="0" offset="0%" />
                  <stop stopColor="#e50000" offset="100%" />
                </linearGradient>
                <linearGradient
                  x1="88.638%"
                  y1="29.267%"
                  x2="22.42%"
                  y2="100%"
                  id="logo-b"
                >
                  <stop stopColor="#" stopOpacity="0" offset="0%" />
                  <stop stopColor="#" offset="100%" />
                </linearGradient>
              </defs>
              <rect fill="#000000" width="32" height="32" rx="16" />
              <path
                d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
                fill="#ff0000"
              />
              <path
                d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                fill="url(#logo-a)"
              />
              <path
                d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                fill="url(#logo-b)"
              />
            </svg>
          </NavLink>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-xs sm:text-sm lg:text-xs uppercase text-slate-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                Paginas
              </span>
            </h3>
            <ul className="mt-2 sm:mt-3 space-y-1">
              {/* Dashboard */}
              <li
                className={`px-2 sm:px-3 py-2 rounded-sm ${
                  pathname.includes("messages") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/dashboard"
                  className={`lg:hidden lg:sidebar-expanded:block text-slate-200 truncate transition duration-150 ${
                    pathname.includes("messages")
                      ? "hover:text-slate-200"
                      : "hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="grow flex items-center">
                      <LayoutDashboard className="opacity-70 w-4 h-4 sm:w-5 sm:h-5 lg:w-4 lg:h-4 xl:w-5 xl:h-5" />

                      <span className="text-sm sm:text-base lg:text-sm font-medium ml-2 sm:ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Painel
                      </span>
                    </div>
                  </div>
                </NavLink>
              </li>
              {/* News */}
              <li
                className={`px-2 sm:px-3 py-2 rounded-sm ${
                  pathname.includes("messages") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/news"
                  className={`lg:hidden lg:sidebar-expanded:block text-slate-200 truncate transition duration-150 ${
                    pathname.includes("messages")
                      ? "hover:text-slate-200"
                      : "hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="grow flex items-center ">
                      <Newspaper className="opacity-70 w-4 h-4 sm:w-5 sm:h-5 lg:w-4 lg:h-4 xl:w-5 xl:h-5" />

                      <span className="text-sm sm:text-base lg:text-sm font-medium ml-2 sm:ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Noticias
                      </span>
                    </div>
                  </div>
                </NavLink>
              </li>
              {/* Categorias */}
              <li
                className={`px-2 sm:px-3 py-2 rounded-sm ${
                  pathname.includes("messages") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/categories"
                  className={`lg:hidden lg:sidebar-expanded:block text-slate-200 truncate transition duration-150 ${
                    pathname.includes("messages")
                      ? "hover:text-slate-200"
                      : "hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="grow flex items-center">
                      <FolderArchive className="opacity-70 w-4 h-4 sm:w-5 sm:h-5 lg:w-4 lg:h-4 xl:w-5 xl:h-5" />
                      <span className="text-sm sm:text-base lg:text-sm font-medium ml-2 sm:ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Categorias
                      </span>
                    </div>
                  </div>
                </NavLink>
              </li>

              {/* Tags */}
              <li
                className={`px-2 sm:px-3 py-2 rounded-sm ${
                  pathname.includes("messages") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/tags"
                  className={`lg:hidden lg:sidebar-expanded:block text-slate-200 truncate transition duration-150 ${
                    pathname.includes("messages")
                      ? "hover:text-slate-200"
                      : "hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="grow flex items-center">
                      <Tags className="opacity-70 w-4 h-4 sm:w-5 sm:h-5 lg:w-4 lg:h-4 xl:w-5 xl:h-5" />
                      <span className="text-sm sm:text-base lg:text-sm font-medium ml-2 sm:ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Tags
                      </span>
                    </div>
                  </div>
                </NavLink>
              </li>
              {/* Propaganda */}
              <li
                className={`px-2 sm:px-3 py-2 rounded-sm ${
                  pathname.includes("messages") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/adds"
                  className={`lg:hidden lg:sidebar-expanded:block text-slate-200 truncate transition duration-150 ${
                    pathname.includes("messages")
                      ? "hover:text-slate-200"
                      : "hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="grow flex items-center">
                      <Receipt className="opacity-70 w-4 h-4 sm:w-5 sm:h-5 lg:w-4 lg:h-4 xl:w-5 xl:h-5" />
                      <span className="text-sm sm:text-base lg:text-sm font-medium ml-2 sm:ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Propaganda
                      </span>
                    </div>
                  </div>
                </NavLink>
              </li>
              {/* Team */}
              <li
                className={`px-2 sm:px-3 py-2 rounded-sm ${
                  pathname.includes("messages") && "bg-slate-900"
                }`}
              >
                <NavLink
                  end
                  to="/team"
                  className={`lg:hidden lg:sidebar-expanded:block text-slate-200 truncate transition duration-150 ${
                    pathname.includes("messages")
                      ? "hover:text-slate-200"
                      : "hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="grow flex items-center">
                      <Users2 className="opacity-70 w-4 h-4 sm:w-5 sm:h-5 lg:w-4 lg:h-4 xl:w-5 xl:h-5" />
                      <span className="text-sm sm:text-base lg:text-sm font-medium ml-2 sm:ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                        Equipe
                      </span>
                    </div>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-2 sm:pt-3 hidden lg:inline-flex 3xl:hidden justify-end mt-auto">
          <div className="px-2 sm:px-3 py-2">
            <button 
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
              className="p-1 rounded-md hover:bg-slate-700 transition-colors duration-200"
            >
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 fill-current sidebar-expanded:rotate-180 transition-transform duration-200"
                viewBox="0 0 24 24"
              >
                <path
                  className="text-slate-400"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
