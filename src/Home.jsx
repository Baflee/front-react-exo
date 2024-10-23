import Header from "./components/Header";
import AdminSection from "./components/AdminSection";
import TagsFilter from "./components/TagsFilter";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [books, setBooks] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/api/books");
        const json = await response.json();
        setBooks(json);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <Header />
      <AdminSection />
      <TagsFilter />
      
      {books && books.length > 0 ? (
        <>
          <p className="font-justicefest text-6xl py-3.5 flex self-center items-center justify-center">
            Les Livres en ventes
          </p>
          <div className="flex grid items-center self-center justify-center grid-cols-4 gap-20 bg-white">
            {books.map((book) => (
              <Link to={{ pathname: `/${book._id}` }} key={book._id}>
                <div className="flex items-center self-center justify-center">
                  {book.images.length === 0 ? (
                    <img
                      alt="Affichage basique du livre"
                      src="/images/cadre.png"
                      className="object-contain"
                    />
                  ) : (
                    <img
                      alt="Affichage donner dans la bd du livre"
                      src={book.images[0]}
                      className="object-contain"
                    />
                  )}
                  <div className="flex grid items-center self-center justify-center grid-cols-1 text-4xl font-justicefest">
                    <p className="font-justicefest">{book.title}</p>
                    <p className="font-doodles">{book.author}</p>
                    <p className="font-doodles">{book.publishingyear}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <p className="font-justicefest text-6xl py-3.5 text-center">
            La boutique est fermée pour le moment 😢
          </p>
        </div>
      )}
    </div>
  );
}

export default Home;
