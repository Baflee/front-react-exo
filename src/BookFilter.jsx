import Header from "./components/Header";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

function BookFilter() {
  const [books, setBooks] = useState(null);
  const params = useParams();

  React.useEffect(() => {
    const fetchCategoryBooks = async () => {
      const data = await fetch("/api/books/category/" + params.name);
      const json = await data.json();
      setBooks(json);
    };

    fetchCategoryBooks().catch(console.error);
  }, []);

  return (
    <div>
      <Header />
      <p className="font-justicefest text-6xl py-3.5 flex self-center items-center justify-center">
        Les Livres en ventes : {params.name}{" "}
        <Link
          to={{ pathname: `/` }}
          className="font-doodles border-b border-t border-solid border-black px-4 py-4 my-4 mx-4 rounded-md"
        >
          Retour
        </Link>
      </p>
      <div className="bg-white flex grid grid-cols-4 self-center items-center justify-center gap-20">
        {books ? (
          books.map((book) => {
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
        ) : (
          <p className="font-justicefest text-6xl py-3.5 flex self-center items-center justify-center">
            Cette catégorie est vide ou n'existe tout simplement pas
          </p>
        )}
      </div>
    </div>
  );
}

export default BookFilter;
