import { Link } from 'react-router-dom'

function Header() {
  return (
    <header>
      <div
        className={`bg-white flex self-center items-center justify-center py-3.5 gap-24`}
      >
        <Link to="/">
          <img src="/images/Readme.png" className={`object-contain`} />
        </Link>
      </div>
      <nav
        className={`font-justicefest bg-white border-b-8 border-t-8 text-xl sm:text-6xl border-b-black border-t-black flex self-center items-center justify-center py-3.5 gap-2 sm:gap-24`}
      >
        <button
          className={`p-5 my-2 flex self-center items-center justify-center`}
        >
          Page Administrateur
        </button>
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
      </nav>
    </header>
  )
}

export default Header
