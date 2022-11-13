import Header from "./components/Header";
import AdminSection from "./components/AdminSection";
import TagsFilter from "./components/TagsFilter";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [books, setBooks] = useState(null);

  React.useEffect(() => {
    const fetchBooks = async () => {
      const data = await fetch("/api/books");
      const json = await data.json();
      await setBooks(json);
    };

    fetchBooks().catch(console.error);
  }, []);

  return (
    <div>
      <Header />
      <AdminSection />
      <TagsFilter />
      <p className="font-justicefest text-6xl py-3.5 flex self-center items-center justify-center">
        Les Livres en ventes
      </p>
      <div className="bg-white flex grid grid-cols-4 self-center items-center justify-center gap-20">
        {books
          ? books.map((book) => {
              return (
                <Link to={{ pathname: `/${book._id}` }} key={book._id}>
                  <div className="flex self-center items-center justify-center">
                    {book.images.length === 0 ? (
                      <img
                        alt="Affichage basique du livre"
                        src="/images/cadre.png"
                        className={`object-contain`}
                      />
                    ) : (
                      <img
                        alt="Affichage donner dans la bd du livre"
                        src={book.images[0]}
                        className={`object-contain`}
                      />
                    )}
                    <div className="font-justicefest flex self-center items-center justify-center text-4xl grid grid-cols-1">
                      <p className="font-justicefest">{book.title}</p>
                      <p className="font-doodles">{book.author}</p>
                      <p className="font-doodles">{book.publishingyear}</p>
                    </div>
                  </div>
                </Link>
              );
            })
          : ""}
      </div>
      {!books ? (
        <p className="font-justicefest text-6xl py-3.5 grid place-items-center h-screen">
          Le Site est en cours de maintenance 😱
        </p>
      ) : (
        ""
      )}
    </div>
  );
}

export default Home;
