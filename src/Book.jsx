import Header from "./components/Header";
import TagsFilter from "./components/TagsFilter";
import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import { Link, useParams, useNavigate } from "react-router-dom";

function Book() {
  const [book, setBook] = useState(null);
  const [message, setMessage] = useState(null);
  const [categories, setCategories] = useState(null);
  const navigate = useNavigate();
  const userStorage = JSON.parse(localStorage.getItem("user"));
  const params = useParams();

  function deleteBook() {
    const deleteBook = async () => {
      const data = await fetch("/api/books", {
        method: "delete",
        mode: "cors",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: "Basic " + userStorage.token,
        }),
        body: JSON.stringify({
          _id: params.id,
        }),
      });

      const json = await data.json();

      if (json.message === "Livre Supprimé") {
        navigate("/");
      }
    };

    deleteBook();
  }

  React.useEffect(() => {
    const fetchCategories = async () => {
      const data = await fetch("/api/categories");
      const json = await data.json();
      await setCategories(json);
    };

    const fetchBook = async () => {
      const data = await fetch("/api/books/" + params.id);
      const json = await data.json();
      await setBook(json);
    };

    fetchCategories().catch(console.error);
    fetchBook().catch(console.error);
  }, [params.id]);

  return (
    <div>
      <Header />
      <TagsFilter />
      {book ? (
        <div className="flex self-center items-center justify-center my-12 grid grid-cols-1">
          <div className="flex self-center items-center justify-center gaWp-24 grid grid-cols-2 mx-10">
            <div className="font-justicefest flex self-center items-center justify-center grid grid-cols-1">
              <div className="font-justicefest flex self-center items-center justify-center text-6xl grid grid-cols-2">
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
                </div>
                <div className="flex self-center items-center justify-center">
                  <p className="font-justicefest">{book.title}</p>
                </div>
                <div className="font-doodles flex self-center items-center justify-center m-10">
                  Auteur : {book.author}
                </div>
                <div className="font-doodles flex self-center items-center justify-center m-10">
                  Editeur : {book.editor}
                </div>
                <div className="font-doodles flex self-center items-center justify-center m-10">
                  Date : {book.publishingyear}
                </div>
                <div className="font-doodles flex self-center items-center justify-center m-10">
                  Stock : {book.stock}
                </div>
                <div className="font-doodles flex self-center items-center justify-center m-10">
                  Pages : {book.pagenumber}
                </div>
                <div className="font-doodles flex self-center items-center justify-center m-10">
                  Prix : {book.price} €
                </div>
              </div>
              <div className="font-doodles flex self-center items-center justify-center text-6xl">
                Tags :
              </div>
              <div className="font-doodles flex self-center items-center justify-center text-4xl m-10">
                {categories
                  ? book.categories.map((bookcategory) => {
                      return categories.map((category) => {
                        if (bookcategory === category._id) {
                          return (
                            <Link
                              to={{
                                pathname: `/category/${category.name}`,
                              }}
                              key={category._id}
                            >
                              <div className="font-doodles border-b border-t border-solid border-black px-4 py-4 my-4 mx-4 rounded-md">
                                {category.name}
                              </div>
                            </Link>
                          );
                        }
                      });
                    })
                  : ""}
              </div>
            </div>
            <div className="flex self-center border-r border-r-black border-l border-l-black items-center justify-center text-4xl grid grid-cols-1 p-3.5">
              <p className="font-doodles">{book.description}</p>
              <p className="font-justicefest my-10">
                Revue des bibliothécaires :
              </p>
              <p className="font-doodles">{book.librarianreview}</p>
              <Link to={{ pathname: `/` }}>
                <div className="font-justicefest mt-10 text-6xl">Retour</div>
              </Link>
            </div>
          </div>
          {userStorage && userStorage.isAdmin === true ? (
            <div className="font-doodles flex self-center items-center justify-center grid grid-cols-2">
              <button
                onClick={() => deleteBook()}
                className="bg-buttoncadre bg-cover font-doodles flex self-center items-center justify-center text-3xl mx-72 mb-20 py-28"
              >
                Supprimer le Livre ?
              </button>
              <Formik
                initialValues={{
                  images: book.images,
                  title: book.title,
                  author: book.author,
                  editor: book.editor,
                  categories: book.categories,
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
                    fetch("api/books", {
                      method: "PATCH",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: "Basic " + userStorage.token,
                      },
                      body: JSON.stringify({
                        _id: params.id,
                        images: values.images,
                        title: values.title,
                        author: values.author,
                        editor: values.editor,
                        categories: values.categories,
                        description: values.description,
                        stock: values.stock,
                        price: values.price,
                        isbn: values.isbn,
                        pagenumber: values.pagenumber,
                        publishingyear: values.publishingyear,
                        librarianreview: values.librarianreview,
                      }),
                    })
                      .then((response) => response.json())
                      .then(async (result) => {
                        if (result.message === "Livre modifié") {
                          setMessage(result.message);
                          window.location.reload(false);
                        } else if (result.message) {
                          setMessage(result.message);
                        } else {
                          setMessage(result.error);
                        }
                      });
                  } catch (error) {
                    setMessage("test : " + error);
                  }
                }}
              >
                <div className="flex self-center bg-logincadre bg-cover px-32 my-32 mx-10 py-64 items-center justify-center content-center grid grid-cols-1 gap-14">
                  <Link to="/">
                    <img alt="mini logo" src="/images/ReadmeMini.png" />
                  </Link>
                  <p className="font-justicefest text-6xl" type="submit">
                    Editer le Livre :
                  </p>
                  <Form>
                    <label className="flex font-doodles text-4xl">
                      Images :
                      <Field name="images" type="text" />
                    </label>
                    <label className="flex font-doodles text-4xl">
                      Titre :
                      <Field name="title" type="text" />
                    </label>
                    <label className="flex font-doodles text-4xl">
                      Auteur :
                      <Field name="author" type="text" />
                    </label>
                    <label className="flex font-doodles text-4xl">
                      Editeur :
                      <Field name="editor" type="text" />
                    </label>
                    <label className="flex font-doodles text-4xl">
                      Categories :
                      <Field name="categories" type="text" />
                    </label>
                    <label className="flex font-doodles text-4xl">
                      Description :
                      <Field name="description" type="text" />
                    </label>
                    <label className="flex font-doodles text-4xl">
                      Stock :
                      <Field name="stock" type="number" />
                    </label>
                    <label className="flex font-doodles text-4xl">
                      Prix :
                      <Field name="price" type="number" />
                    </label>
                    <label className="flex font-doodles text-4xl">
                      isbn :
                      <Field name="isbn" type="text" />
                    </label>
                    <label className="flex font-doodles text-4xl">
                      Nombre de Page :
                      <Field name="pagenumber" type="number" />
                    </label>
                    <label className="flex font-doodles text-4xl">
                      Annee de Publication :
                      <Field name="publishingyear" type="number" />
                    </label>
                    <label className="flex font-doodles text-4xl">
                      Avis du Libraire :
                      <Field name="librarianreview" type="text" />
                    </label>
                    <button
                      className="font-doodles text-6xl otdds"
                      type="submit"
                    >
                      Envoyer
                    </button>
                  </Form>
                </div>
              </Formik>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="font-justicefest flex self-center items-center justify-center text-8xl">
          Livre Introuvable
        </div>
      )}
    </div>
  );
}

export default Book;
