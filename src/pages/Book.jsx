import React, { useState, useEffect } from "react";
import { Formik, Field, Form, FieldArray } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import TagsFilter from "../components/TagsFilter";
import { fetchBook } from "../services/bookService";
import { fetchCategories } from "../services/categoryService";

const ComicButton = ({ children, onClick, className = "", type = "button" }) => (
  <button
    type={type}
    onClick={onClick}
    className={`px-4 py-2 text-lg font-bold text-white bg-black border-4 border-black rounded-lg shadow-comic hover:bg-white hover:text-black transition-all duration-200 ${className}`}
  >
    {children}
  </button>
);

const ComicInput = ({ className = "", ...props }) => (
  <input
    {...props}
    className={`p-2 border-4 border-black rounded-lg font-comic text-lg ${className}`}
  />
);

const ComicTextarea = ({ className = "", ...props }) => (
  <textarea
    {...props}
    className={`p-2 border-4 border-black rounded-lg font-comic text-lg ${className}`}
  />
);

export default function Book() {
  const [book, setBook] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const userStorage = JSON.parse(localStorage.getItem("user"));
  const params = useParams();

  useEffect(() => {
    fetchCategories();
    SetBook(fetchBook(params.id));
  }, [params.id]);

  if (!book) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="p-8 transform bg-white border-4 border-black rounded-lg shadow-comic rotate-3 animate-appear">
          <p className="text-6xl text-black font-comic">Livre Introuvable</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <Header />
      <TagsFilter />

      <div className="container mx-auto mt-8">
        <div className="flex flex-col gap-8 lg:flex-row animate-slideUp">
          {/* Left Column: Book Image and Details */}
          <div className="flex-1 p-6 transform bg-white border-4 border-black rounded-lg shadow-comic -rotate-1">
            <div className="mb-6 overflow-hidden border-4 border-black rounded-lg">
              <img
                alt={book.images.length === 0 ? "Default book display" : `Book: ${book.title}`}
                src={book.images.length === 0 ? "/images/cadre.png" : book.images[0]}
                className="object-cover w-full h-64"
              />
            </div>
            <h1 className="mb-4 text-4xl font-bold text-black font-comic">{book.title}</h1>
            <BookDetail label="Auteur" value={book.author} />
            <BookDetail label="Éditeur" value={book.editor} />
            <BookDetail label="Date" value={book.publishingyear} />
            <BookDetail label="Stock" value={book.stock} />
            <BookDetail label="Pages" value={book.pagenumber} />
            <BookDetail label="Prix" value={`${book.price} €`} />
          </div>

          {/* Right Column: Description and Tags */}
          <div className="flex-1 p-6 transform bg-white border-4 border-black rounded-lg shadow-comic rotate-1">
            <h2 className="mb-4 text-3xl font-bold text-black font-comic">Description :</h2>
            <p className="mb-6 text-xl font-comic">{book.description}</p>

            <h2 className="mb-4 text-3xl font-bold text-black font-comic">Avis du Libraire :</h2>
            <p className="mb-6 text-xl font-comic">{book.librarianreview}</p>

            <h2 className="mb-4 text-3xl font-bold text-black font-comic">Tags :</h2>
            <div className="flex flex-wrap gap-2">
              {book.categories && book.categories.map((category, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm text-white bg-black border-2 border-black rounded-full font-comic"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>

        {userStorage && userStorage.isAdmin && (
          <AdminSection book={book} deleteBook={deleteBook} message={message} setMessage={setMessage} params={params} userStorage={userStorage} />
        )}
      </div>
    </div>
  );
}

function BookDetail({ label, value }) {
  return (
    <p className="mb-2 text-xl font-comic">
      <span className="font-bold">{label}:</span> {value}
    </p>
  );
}

function AdminSection({ book, deleteBook, message, setMessage, params, userStorage }) {
  return (
    <div className="mt-8 animate-slideUp">
      <div className="p-6 transform bg-white border-4 border-black rounded-lg shadow-comic rotate-1">
        <h2 className="mb-4 text-3xl font-bold text-black font-comic">Admin Actions</h2>
        {message && <p className="mb-4 text-xl text-red-500 font-comic">{message}</p>}
        <ComicButton onClick={deleteBook} className="mb-4">
          Supprimer le Livre
        </ComicButton>

        <Formik
          initialValues={{
            images: book.images,
            title: book.title,
            author: book.author,
            editor: book.editor,
            categories: book.categories || [],
            description: book.description,
            stock: book.stock,
            price: book.price,
            isbn: book.isbn,
            pagenumber: book.pagenumber,
            publishingyear: book.publishingyear,
            librarianreview: book.librarianreview,
          }}
          onSubmit={async (values) => {
            try {
              const response = await fetch("/api/books", {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Basic " + userStorage.token,
                },
                body: JSON.stringify({
                  _id: params.id,
                  ...values,
                }),
              });
              const result = await response.json();
              setMessage(result.message || result.error);
              if (result.message === "Livre modifié") {
                window.location.reload();
              }
            } catch (error) {
              setMessage("Erreur : " + error.message);
            }
          }}
        >
          {({ values }) => (
            <Form className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField name="images" label="Images" />
              <FormField name="title" label="Titre" />
              <FormField name="author" label="Auteur" />
              <FormField name="editor" label="Éditeur" />
              <div className="col-span-2">
                <label className="flex flex-col font-comic">
                  <span className="mb-1 text-lg">Categories :</span>
                  <FieldArray name="categories">
                    {({ push, remove }) => (
                      <div>
                        {values.categories.map((category, index) => (
                          <div key={index} className="flex items-center mb-2">
                            <Field
                              name={`categories.${index}`}
                              as={ComicInput}
                              className="flex-grow mr-2"
                            />
                            <ComicButton
                              type="button"
                              onClick={() => remove(index)}
                              className="px-2 py-1 text-sm"
                            >
                              Supprimer
                            </ComicButton>
                          </div>
                        ))}
                        <ComicButton
                          type="button"
                          onClick={() => push('')}
                          className="mt-2"
                        >
                          Ajouter une catégorie
                        </ComicButton>
                      </div>
                    )}
                  </FieldArray>
                </label>
              </div>
              <FormField name="description" label="Description" as="textarea" />
              <FormField name="stock" label="Stock" type="number" />
              <FormField name="price" label="Prix" type="number" />
              <FormField name="isbn" label="ISBN" />
              <FormField name="pagenumber" label="Nombre de Pages" type="number" />
              <FormField name="publishingyear" label="Année de Publication" type="number" />
              <FormField name="librarianreview" label="Avis du Libraire" as="textarea" />

              <ComicButton type="submit" className="col-span-2 mt-4">
                Enregistrer les modifications
              </ComicButton>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

function FormField({ name, label, as, type = "text" }) {
  const Component = as === "textarea" ? ComicTextarea : ComicInput;
  return (
    <label className="flex flex-col font-comic">
      <span className="mb-1 text-lg">{label} :</span>
      <Field
        name={name}
        as={Component}
        type={type}
      />
    </label>
  );
}