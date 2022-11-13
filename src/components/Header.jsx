import { Link } from "react-router-dom";
import React from "react";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));

  function clearStorage() {
    localStorage.clear();
    window.location.reload(false);
  }

  return (
    <header>
      <div
        className={`bg-white flex self-center items-center justify-center py-3.5 gap-24`}
      >
        <Link to="/">
          <img
            alt="logo"
            src="/images/Readme.png"
            className={`object-contain`}
          />
        </Link>
      </div>
      <nav
        className={`font-justicefest bg-white border-b-8 border-t-8 text-xl sm:text-6xl border-b-black border-t-black flex self-center items-center justify-center py-3.5 gap-2 sm:gap-24`}
      >
        {user ? (
          <div
            className={`p-5 my-2 flex self-center items-center justify-center`}
          >
            <Link
              to={{ pathname: `/user/${user._id}` }}
              className={`p-5 my-2 flex self-center items-center justify-center`}
            >
              Profile
            </Link>
            <button
              onClick={() => clearStorage()}
              className={`p-5 my-2 flex self-center items-center justify-center`}
            >
              Deconnexion
            </button>
          </div>
        ) : (
          <div className={`flex self-center items-center justify-center`}>
            <Link
              to="/signup"
              className={`p-5 my-2 flex self-center items-center justify-center`}
            >
              Inscription
            </Link>
            <Link
              to="/login"
              className={`p-5 my-2 flex self-center items-center justify-center`}
            >
              Connexion
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
