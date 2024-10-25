import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen } from "lucide-react";
import Header from "../components/Header";
import AdminSection from "../components/AdminSection";
import TagsFilter from "../components/TagsFilter";

export default function BookFilter() {
  const [books, setBooks] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoryBooks = async () => {
      try {
        const response = await fetch("/api/books/category/" + params.name);
        const json = await response.json();
        setBooks(json);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchCategoryBooks();
  }, [params.name]);

  return (
    <div className="min-h-screen text-black">
      <Header />
      <AdminSection />
      <TagsFilter />

      <main className="container px-4 py-8 mx-auto">
        <motion.div 
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="relative inline-block mb-4 text-5xl font-justicefest md:text-6xl">
            <span className="relative z-10">Les Livres en vente : {params.name}</span>
          </h1>
        </motion.div>

        {books && books.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
          >
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="flex items-center justify-center h-[60vh]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-8 text-center bg-white border-4 border-black rounded-lg shadow-comic">
              <BookOpen className="w-24 h-24 mx-auto mb-4 text-gray-400" />
              <h2 className="mb-2 text-4xl font-comic">Catégorie Vide</h2>
              <p className="text-xl text-gray-600 font-comic">
                Cette catégorie est vide ou n'existe tout simplement pas 😢
              </p>
            </div>
          </motion.div>
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