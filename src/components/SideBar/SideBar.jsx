import { FiHome, FiMenu } from "react-icons/fi";

import { NavLink } from "react-router-dom";

import { Link } from "react-router-dom";
import { CONSTANTS } from "../../lib/constants";
import { useSelector } from "react-redux";
import { ADMIN_SIDEBAR_TOP_TABS, USER_SIDEBAR_TOP_TABS } from "../../Helper/tabs";
import { useMemo } from "react";

export const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const user = useSelector((state) => state.auth.user);

  const isLoggedIn = !!user;

  const tabs = useMemo(() => {
    switch (user?.role) {
      case CONSTANTS.ADMIN:
        return ADMIN_SIDEBAR_TOP_TABS;

      case CONSTANTS.USER:
        return USER_SIDEBAR_TOP_TABS;

      default:
        return [];
    }
  }, [user]);

  return (
    <aside
      className={`h-full shrink-0 flex flex-col justify-between gap-4 px-3 py-5 border-r border-gray-600 select-none ${
        sidebarOpen ? "w-[256px]" : "w-[76px]"
      }`}
    >
      <div className="flex flex-col gap-3">
        <div className={`flex px-3 gap-7 ${!sidebarOpen ? "justify-center" : ""}`}>
          <span
            className="p-1 h-16 mt-1.5 hover:cursor-pointer rounded-full text-xl transition duration-300 text-white"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FiMenu />
          </span>

          {sidebarOpen && (
            <div className="relative text-white">
              <Link to="/" className="h-16 font-bold text-3xl text-center hover:cursor-pointer">
                {CONSTANTS.PROJECT_NAME}
              </Link>
              <p className="absolute bottom-4 right-0 text-sm font-semibold">
                {CONSTANTS.PROJECT_SUB_NAME}
              </p>
            </div>
          )}
        </div>

        <NavLink
          to="/"
          className={({ isActive }) =>
            `h-10 text-white rounded-3xl flex items-center gap-3 ${
              sidebarOpen ? "px-5" : "justify-center"
            } ${
              isActive
                ? "bg-primary rounded-3xl"
                : "hover:bg-gray-400 hover:text-gray-900 duration-200"
            }`
          }
        >
          <span className="text-xl">
            <FiHome />
          </span>
          {sidebarOpen && <span className="text-[17px] font-semibold">Home</span>}
        </NavLink>

        {isLoggedIn &&
          tabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `h-10 text-white rounded-3xl flex items-center gap-3 ${
                  sidebarOpen ? "px-5" : "justify-center"
                } ${
                  isActive
                    ? "bg-primary rounded-3xl"
                    : "hover:bg-gray-400 hover:text-gray-900 duration-200"
                }`
              }
            >
              <span className="text-xl">{tab.icon}</span>
              {sidebarOpen && <span className="text-[17px] font-semibold">{tab.label}</span>}
            </NavLink>
          ))}
      </div>
    </aside>
  );
};
