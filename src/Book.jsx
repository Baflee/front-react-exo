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
        <div className="flex grid items-center self-center justify-center grid-cols-1 my-12">
          <div className="flex grid items-center self-center justify-center grid-cols-2 mx-10 gaWp-24">
            <div className="flex grid items-center self-center justify-center grid-cols-1 font-justicefest">
              <div className="flex grid items-center self-center justify-center grid-cols-2 text-6xl font-justicefest">
                <div className="flex items-center self-center justify-center">
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
                <div className="flex items-center self-center justify-center">
                  <p className="font-justicefest">{book.title}</p>
                </div>
                <div className="flex items-center self-center justify-center m-10 font-doodles">
                  Auteur : {book.author}
                </div>
                <div className="flex items-center self-center justify-center m-10 font-doodles">
                  Editeur : {book.editor}
                </div>
                <div className="flex items-center self-center justify-center m-10 font-doodles">
                  Date : {book.publishingyear}
                </div>
                <div className="flex items-center self-center justify-center m-10 font-doodles">
                  Stock : {book.stock}
                </div>
                <div className="flex items-center self-center justify-center m-10 font-doodles">
                  Pages : {book.pagenumber}
                </div>
                <div className="flex items-center self-center justify-center m-10 font-doodles">
                  Prix : {book.price} €
                </div>
              </div>
              <div className="flex items-center self-center justify-center text-6xl font-doodles">
                Tags :
              </div>
              <div className="flex items-center self-center justify-center m-10 text-4xl font-doodles">
                {categories && categories.length > 0
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
                              <div className="px-4 py-4 mx-4 my-4 border-t border-b border-black border-solid rounded-md font-doodles">
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
              <p className="my-10 font-justicefest">
                Revue des bibliothécaires :
              </p>
              <p className="font-doodles">{book.librarianreview}</p>
              <Link to={{ pathname: `/` }}>
                <div className="mt-10 text-6xl font-justicefest">Retour</div>
              </Link>
            </div>
          </div>
          {userStorage && userStorage.isAdmin === true ? (
            <>
              <p className="font-justicefest text-4xl py-0.5 flex self-center items-center justify-center">
                {message}
              </p>
              <div className="flex grid items-center self-center justify-center grid-cols-2 font-doodles">
                <button
                  onClick={() => deleteBook()}
                  className="flex items-center self-center justify-center mb-20 text-3xl bg-cover bg-buttoncadre font-doodles mx-72 py-28"
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
                  <div className="flex grid items-center content-center self-center justify-center grid-cols-1 px-32 py-64 mx-10 my-32 bg-cover bg-logincadre gap-14">
                    <Link to="/">
                      <img alt="mini logo" src="/images/ReadmeMini.png" />
                    </Link>
                    <p className="text-6xl font-justicefest" type="submit">
                      Editer le Livre :
                    </p>
                    <Form>
                      <label className="flex text-4xl font-doodles">
                        Images :
                        <Field name="images" type="text" />
                      </label>
                      <label className="flex text-4xl font-doodles">
                        Titre :
                        <Field name="title" type="text" />
                      </label>
                      <label className="flex text-4xl font-doodles">
                        Auteur :
                        <Field name="author" type="text" />
                      </label>
                      <label className="flex text-4xl font-doodles">
                        Editeur :
                        <Field name="editor" type="text" />
                      </label>
                      <label className="flex text-4xl font-doodles">
                        Categories :
                        <Field name="categories" type="text" />
                      </label>
                      <label className="flex text-4xl font-doodles">
                        Description :
                        <Field name="description" type="text" />
                      </label>
                      <label className="flex text-4xl font-doodles">
                        Stock :
                        <Field name="stock" type="number" />
                      </label>
                      <label className="flex text-4xl font-doodles">
                        Prix :
                        <Field name="price" type="number" />
                      </label>
                      <label className="flex text-4xl font-doodles">
                        isbn :
                        <Field name="isbn" type="text" />
                      </label>
                      <label className="flex text-4xl font-doodles">
                        Nombre de Page :
                        <Field name="pagenumber" type="number" />
                      </label>
                      <label className="flex text-4xl font-doodles">
                        Annee de Publication :
                        <Field name="publishingyear" type="number" />
                      </label>
                      <label className="flex text-4xl font-doodles">
                        Avis du Libraire :
                        <Field name="librarianreview" type="text" />
                      </label>
                      <button
                        className="text-6xl font-doodles otdds"
                        type="submit"
                      >
                        Envoyer
                      </button>
                    </Form>
                  </div>
                </Formik>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="flex items-center self-center justify-center font-justicefest text-8xl">
          Livre Introuvable
        </div>
      )}
    </div>
  );
}

export default Book;
