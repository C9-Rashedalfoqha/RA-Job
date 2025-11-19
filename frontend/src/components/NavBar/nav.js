import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { PiWarningCircleFill } from "react-icons/pi";
import { IoIosContact } from "react-icons/io";
import { FaMessage } from "react-icons/fa6";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { userContext } from "../../App";

const Nav = () => {
  const {
    logout,
    isLoggedIn,
    userPersonal,
    searchTerm,
    setSearchTerm
  } = useContext(userContext);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-3 sm:flex-row sm:items-center sm:gap-6">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="https://i.ibb.co/tDmLH5H/logo.png"
            alt="RA Job logo"
            className="h-10 w-10 rounded-xl border border-slate-100 object-cover"
          />
          <span className="font-display text-lg font-semibold tracking-tight text-ink">
            RA Job
          </span>
        </Link>

        <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <CiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-softer" />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search roles, companies, locations..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-2.5 pl-12 pr-4 font-medium text-ink placeholder:text-slate-400 focus:border-brand focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/30"
            />
          </div>

          <nav className="flex items-center justify-between gap-2 sm:justify-end">
            <Link
              to="/"
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-transparent text-2xl text-ink hover:border-slate-200 hover:bg-slate-50"
              aria-label="Home"
            >
              <AiFillHome />
            </Link>
            <Link
              to="/about"
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-transparent text-2xl text-ink hover:border-slate-200 hover:bg-slate-50"
              aria-label="About"
            >
              <PiWarningCircleFill />
            </Link>
            <Link
              to="/job"
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-transparent text-2xl text-ink hover:border-slate-200 hover:bg-slate-50"
              aria-label="Jobs"
            >
              <FaMessage />
            </Link>
            <Link
              to="/login"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm hover:-translate-y-0.5 hover:shadow"
              aria-label="Account"
            >
              {userPersonal.photo ? (
                <img
                  src={userPersonal.photo}
                  alt={userPersonal.FirstName || "User avatar"}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <IoIosContact className="text-2xl text-ink" />
              )}
            </Link>
            <button
              type="button"
              onClick={logout}
              className="group flex items-center gap-2 rounded-2xl bg-ink px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-ink/90"
            >
              <RiLogoutCircleRLine className="text-lg" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Nav;
