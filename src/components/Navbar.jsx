import React, { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { BiChevronDown } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { HiMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose, AiOutlineLogout } from "react-icons/ai";
import { Link } from "react-router-dom";
import CustomButton from "./CustomButton";
import { useSelector } from "react-redux";
import { useKindeAuth } from "@kinde-oss/kinde-auth-react";

function MenuList({ users, onClick }) {
  const { logout } = useKindeAuth();

  const handleLogout = () => {
    logout(); 
    onClick(); 
  };

  return (
    <div>
      <Menu as="div" className="inline-block text-left">
        <div className="flex">
          <Menu.Button className="inline-flex gap-2 w-full rounded-md bg-white md:px-4 py-2 text-sm font-medium text-slate-700 hover:bg-opacity-20">
            <div className="leading[80px] flex flex-col items-start">
              <p className="text-sm font-semibold ">
                {users?.firstName ?? users?.name}
              </p>
              <span className="text-sm text-blue-600 ">
                {users?.jobTitle ?? users?.email}
              </span>
            </div>
            <img
              src={users?.profileUrl}
              alt="users profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <BiChevronDown className="h-8 w-8 text-slate-600" aria-hidden="true" />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-50 right-2 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg focus:outline-none">
            <div className="p-1">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={`${users?.accountType ? "users-profile" : "company-profile"}`}
                    className={`${
                      active ? "bg-blue-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md p-2 text-sm`}
                    onClick={onClick}
                  >
                    <CgProfile
                      className={`${
                        active ? "text-white" : "text-gray-600"
                      } mr-2 h-5 w-5`}
                      aria-hidden="true"
                    />
                    {users?.accountType ? "users Profile" : "Company Profile"}
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleLogout}
                    className={`${
                      active ? "bg-blue-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <AiOutlineLogout
                      className={`${
                        active ? "text-white" : "text-gray-600"
                      } mr-2 h-5 w-5`}
                      aria-hidden="true"
                    />
                    Log Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

const Navbar = () => {
  const users = useSelector((state) => state.users);
  const [isOpen, setIsOpen] = useState(false);
  const { login, register, isAuthenticated, user, logout } = useKindeAuth();

  const handleCloseNavbar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className="relative bg-[#f7fdfd] z-50">
        <nav className="container mx-auto flex items-center justify-between p-5">
          <div>
            <Link to="/" className="text-orange-600 font-bold text-xl">
              Kaam<span className="text-[#fb923c]">Do</span>
            </Link>
          </div>

          <ul className="hidden lg:flex gap-10 text-base">
            <li>
              <Link to="/">Find Job</Link>
            </li>
            <li>
              <Link to="/companies">Companies</Link>
            </li>
            <li>
              <Link to="/upload-job">Upload Job</Link>
            </li>
            <li>
              <Link to="/about-us">About</Link>
            </li>
          </ul>

          <div className="hidden lg:block">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <button onClick={logout} type="button" className="text-gray-800 font-medium">Sign Out</button>
                <p>{user?.given_name}</p>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <button onClick={register} type="button" className="text-gray-800 font-medium">Sign Up</button>
                <button onClick={login} type="button" className="text-gray-800 font-medium">Sign In</button>
              </div>
            )}
          </div>

          <button
            className="block lg:hidden text-slate-900"
            onClick={handleCloseNavbar}
          >
            {isOpen ? <AiOutlineClose size={26} /> : <HiMenuAlt3 size={26} />}
          </button>
        </nav>

        {/* MOBILE MENU */}
        <div
          className={`${
            isOpen ? "absolute flex bg-[#f7fdfd]" : "hidden"
          } container mx-auto lg:hidden flex-col pl-8 gap-3 py-5`}
        >
          <Link to="/" onClick={handleCloseNavbar}>
            Find Job
          </Link>
          <Link to="/companies" onClick={handleCloseNavbar}>
            Companies
          </Link>
          <Link
            onClick={handleCloseNavbar}
            to={users?.accountType === "seeker" ? "apply-history" : "upload-job"}
          >
            {users?.accountType === "seeker" ? "Applications" : "Upload Job"}
          </Link>
          <Link to="/about-us" onClick={handleCloseNavbar}>
            About
          </Link>

          <div className="w-full py-10">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <button onClick={logout} type="button" className="text-gray-800 font-medium">Sign Out</button>
                <p>{user?.given_name}</p>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <button onClick={register} type="button" className="text-gray-800 font-medium">Sign Up</button>
                <button onClick={login} type="button" className="text-gray-800 font-medium">Sign In</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

