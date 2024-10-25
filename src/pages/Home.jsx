import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import AdminSection from "../components/AdminSection";
import TagsFilter from "../components/TagsFilter";
import { BookOpen } from "lucide-react";

export default function Home() {
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
    <div className="min-h-screen bg-white">
      <Header />
      <AdminSection />
      <TagsFilter />

      <main className="container px-4 py-8 mx-auto">
        {books && books.length > 0 ? (
          <>
            <h1 className="relative mb-8 text-5xl text-center font-justicefest md:text-6xl">
              <span className="relative z-10">Les Livres en Vente</span>
              <svg className="absolute inset-0 w-full h-full -z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M5,50 Q25,45 50,50 T95,50" fill="none" stroke="black" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
              </svg>
            </h1>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {books.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-[60vh]">
            <div className="text-center">
              <BookOpen className="w-24 h-24 mx-auto mb-4 text-gray-400" />
              <h2 className="mb-2 text-4xl font-comic">La boutique est fermée</h2>
              <p className="text-xl text-gray-600 font-comic">Revenez plus tard 😢</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function BookCard({ book }) {
  return (
    <Link to={`/${book._id}`} className="block group">
      <div className="relative p-4 transition-transform transform group-hover:scale-105">
        <div className="relative z-10">
          <div className="mb-4 aspect-w-3 aspect-h-4">
            {book.images.length === 0 ? (
              <img
                alt="Affichage basique du livre"
                src="/images/cadre.png"
                className="object-cover w-full h-full"
              />
            ) : (
              <img
                alt="Affichage donné dans la BD du livre"
                src={book.images[0]}
                className="object-cover w-full h-full"
              />
            )}
          </div>
          <div className="text-center">
            <h3 className="mb-1 text-xl font-comic line-clamp-2">{book.title}</h3>
            <p className="mb-1 text-lg text-gray-600 font-comic">{book.author}</p>
            <p className="text-sm text-gray-500 font-comic">{book.publishingyear}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}