import Header from "./components/Header";
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [books, setBooks] = useState(null);
  const [categories, setCategories] = useState(null);

  React.useEffect(() => {
    const fetchBooks = async () => {
      const data = await fetch("/api/books");
      const json = await data.json();
      await setBooks(json);
    };

    const fetchCategories = async () => {
      const data = await fetch("/api/categories");
      const json = await data.json();
      await setCategories(json);
    };

    fetchBooks().catch(console.error);
    fetchCategories().catch(console.error);
  }, []);

  return (
    <div>
      <Header />
      <div className="bg-white flex grid grid-cols-4 self-center items-center justify-center">
        {categories ? (
          categories.map((category) => {
            return (
              <Link
                to={{
                  pathname: `/category/${category.name}`,
                }}
                key={category._id}
              >
                <div className="font-doodles border-b border-t border-solid border-black px-2 py-2 mt-2 mx-4 text-4xl rounded-md">
                  {category.name}
                </div>
              </Link>
            );
          })
        ) : (
          <p className="font-justicefest text-6xl py-3.5 flex self-center items-center justify-center">
            Le Site est en cours de maintenance 😱
          </p>
        )}
      </div>
      <p className="font-justicefest text-6xl py-3.5 flex self-center items-center justify-center">
        Les Livres en ventes
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
            Le Site est en cours de maintenance 😱
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;
