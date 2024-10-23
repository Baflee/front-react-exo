import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form } from "formik";

function AdminSection() {
  const [bookSection, setBookSection] = useState(false);
  const [categorySection, setCategorySection] = useState(false);
  const [categories, setCategories] = useState(null);
  const [bookForms, setBookForms] = useState({
    images: ["/images/cadre.png"],
    title: null,
    author: null,
    editor: null,
    categories: ["6346bd769c7d54cc95b82beb"],
    description: null,
    stock: null,
    isbn: null,
    pagenumber: null,
    price: null,
    publishingyear: null,
  });
  const [messageBook, setMessageBook] = useState(null);
  const [messageCat, setMessageCat] = useState(null);
  const userStorage = JSON.parse(localStorage.getItem("user"));

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setBookForms((values) => ({ ...values, [name]: value }));
  };

  const handleChangeArray = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setBookForms((values) => ({ ...values, [name]: [value] }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetch("/api/books", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: "Basic " + userStorage.token,
        }),
        body: JSON.stringify(bookForms),
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.message) {
            setMessageBook(result.message);
          } else {
            setMessageBook(result.error);
          }
        });
    } catch (error) {
      setMessageBook(JSON.stringify(error));
    }
  };

  const handleStateBook = () => {
    if (bookSection) {
      setBookSection(false);
    } else {
      setBookSection(true);
      setCategorySection(false);
    }
  };

  const handleStateCategory = () => {
    if (categorySection) {
      setCategorySection(false);
    } else {
      setCategorySection(true);
      setBookSection(false);
    }
  };

  React.useEffect(() => {
    const fetchCategories = async () => {
      const data = await fetch("/api/categories");
      const json = await data.json();
      await setCategories(json);
    };

    fetchCategories().catch(console.error);
  }, []);

  return (
    <>
      {userStorage && userStorage.isAdmin === true ? (
        <>
          <p className="font-justicefest text-6xl py-3.5 flex self-center items-center justify-center">
            Section Admin :
          </p>
          <p className="font-justicefest text-6xl py-3.5 flex self-center items-center justify-center">
            {messageBook}
          </p>
          <div className="flex grid items-center self-center justify-center grid-cols-2 gap-10">
            <div className="flex items-center self-center justify-center">
              <p className="font-justicefest text-4xl py-3.5 flex self-center items-center justify-center">
                Livre :
              </p>
              <button
                onClick={() => handleStateBook()}
                className="font-justicefest text-6xl py-3.5 border-b border-t border-solid border-black px-2 py-2 rounded-md"
              >
                {bookSection ? "Fermer" : "Ouvrir"}
              </button>
            </div>
            <div className="flex items-center self-center justify-center">
              <p className="font-justicefest text-4xl py-3.5 flex self-center items-center justify-center">
                Catégorie :
              </p>
              <button
                onClick={() => handleStateCategory()}
                className="font-justicefest text-6xl py-3.5 border-b border-t border-solid border-black px-2 py-2 rounded-md"
              >
                {categorySection ? "Fermer" : "Ouvrir"}
              </button>
            </div>
          </div>
          <div className="font-justicefest text-4xl py-3.5 flex self-center items-center justify-center">
            {bookSection ? (
              <>
                <div className="grid grid-cols-1">
                  <p className="font-justicefest text-4xl py-0.5 flex self-center items-center justify-center">
                    {messageBook}
                  </p>
                  <div className="flex grid items-center content-center self-center justify-center grid-cols-1 px-24 py-24 mx-10 mt-2 bg-cover bg-logincadre mb-15 gap-14">
                    <Link to="/">
                      <img alt="mini logo" src="/images/ReadmeMini.png" />
                    </Link>
                    <p className="text-6xl font-justicefest" type="submit">
                      Créer une page de livre :
                    </p>
                    <form onSubmit={handleSubmit}>
                      <label className="flex text-2xl font-doodles">
                        Images :
                        <input
                          name="images"
                          type="text"
                          required="required"
                          defaultValue="/images/cadre.png"
                          onChange={handleChangeArray}
                        />
                      </label>
                      <label className="flex text-2xl font-doodles">
                        Titre :
                        <input
                          name="title"
                          type="text"
                          required="required"
                          onChange={handleChange}
                        />
                      </label>
                      <label className="flex text-2xl font-doodles">
                        Auteur :
                        <input
                          name="author"
                          type="text"
                          required="required"
                          onChange={handleChange}
                        />
                      </label>
                      <label className="flex text-2xl font-doodles">
                        Editeur :
                        <input
                          name="editor"
                          type="text"
                          required="required"
                          onChange={handleChange}
                        />
                      </label>
                      <label className="flex text-2xl font-doodles">
                        Categories :
                        <input
                          name="categories"
                          type="text"
                          required="required"
                          defaultValue="6346bd769c7d54cc95b82beb"
                          onChange={handleChangeArray}
                        />
                      </label>
                      <label className="flex text-2xl font-doodles">
                        Description :
                        <input
                          name="description"
                          type="text"
                          required="required"
                          onChange={handleChange}
                        />
                      </label>
                      <label className="flex text-2xl font-doodles">
                        Stock :
                        <input
                          name="stock"
                          type="number"
                          required="required"
                          onChange={handleChange}
                        />
                      </label>
                      <label className="flex text-2xl font-doodles">
                        Prix :
                        <input
                          name="price"
                          type="number"
                          required="required"
                          onChange={handleChange}
                        />
                      </label>
                      <label className="flex text-2xl font-doodles">
                        isbn :
                        <input
                          name="isbn"
                          type="text"
                          required="required"
                          onChange={handleChange}
                        />
                      </label>
                      <label className="flex text-2xl font-doodles">
                        Nombre de Page :
                        <input
                          name="pagenumber"
                          type="number"
                          required="required"
                          onChange={handleChange}
                        />
                      </label>
                      <label className="flex text-4xl font-doodles">
                        Annee de Publication :
                        <input
                          name="publishingyear"
                          type="number"
                          required="required"
                          onChange={handleChange}
                        />
                      </label>
                      <label className="flex text-4xl font-doodles">
                        Avis du Libraire :
                        <input
                          name="librarianreview"
                          type="text"
                          onChange={handleChange}
                        />
                      </label>
                      <button
                        className="text-6xl font-doodles otdds"
                        type="submit"
                      >
                        Envoyer
                      </button>
                    </form>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
            {categorySection ? (
              <>
                <div className="grid grid-cols-1">
                  <p className="font-justicefest text-4xl py-0.5 flex self-center items-center justify-center">
                    {messageCat}
                  </p>
                  <div className="grid grid-cols-2">
                    <Formik
                      initialValues={{ name: "" }}
                      onSubmit={async (values) => {
                        await new Promise((resolve) =>
                          setTimeout(resolve, 500)
                        );

                        try {
                          await fetch("api/categories", {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: "Basic " + userStorage.token,
                            },
                            body: JSON.stringify({
                              name: values.name,
                            }),
                          })
                            .then((response) => response.json())
                            .then((result) => {
                              if (result.message) {
                                setMessageCat(result.message);
                              } else {
                                setMessageCat(result.error);
                              }
                            });
                        } catch (error) {
                          setMessageCat(error);
                        }
                      }}
                    >
                      <div className="flex grid items-center content-center self-center justify-center grid-cols-1 px-20 py-32 mx-10 my-2 bg-cover bg-logincadre gap-14">
                        <Link to="/">
                          <img alt="mini logo" src="/images/ReadmeMini.png" />
                        </Link>
                        <p className="text-4xl font-justicefest" type="submit">
                          Création de catégorie :
                        </p>
                        <Form>
                          <label className="flex text-2xl font-doodles">
                            Nom :
                            <Field
                              name="name"
                              type="name"
                              placeholder="Horreur"
                              required="required"
                            />
                          </label>
                          <button
                            className="text-4xl font-doodles"
                            type="submit"
                          >
                            Créer
                          </button>
                        </Form>
                      </div>
                    </Formik>
                    <Formik
                      initialValues={{ name: "" }}
                      onSubmit={async (values) => {
                        await new Promise((resolve) =>
                          setTimeout(resolve, 500)
                        );

                        try {
                          await fetch("api/categories", {
                            method: "DELETE",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: "Basic " + userStorage.token,
                            },
                            body: JSON.stringify({
                              name: values.name,
                            }),
                          })
                            .then((response) => response.json())
                            .then((result) => {
                              if (result.message) {
                                setMessageCat(result.message);
                              } else {
                                setMessageCat(result.error);
                              }
                            });
                        } catch (error) {
                          setMessageCat(error);
                        }
                      }}
                    >
                      <div className="flex grid items-center content-center self-center justify-center grid-cols-1 px-20 py-32 mx-10 my-2 bg-cover bg-logincadre gap-14">
                        <Link to="/">
                          <img alt="mini logo" src="/images/ReadmeMini.png" />
                        </Link>
                        <p className="text-4xl font-justicefest" type="submit">
                          Suppresion d'une catégorie :
                        </p>
                        <Form>
                          <label className="flex text-2xl font-doodles">
                            Nom :
                            <Field
                              as="select"
                              name="name"
                              placeholder="Horreur"
                              required="required"
                            >
                              {categories && categories.length > 0
                                ? categories.map((category) => {
                                    return (
                                      <option value={category.name}>
                                        {category.name}
                                      </option>
                                    );
                                  })
                                : ""}
                            </Field>
                          </label>
                          <button
                            className="text-4xl font-doodles"
                            type="submit"
                          >
                            Supprimer
                          </button>
                        </Form>
                      </div>
                    </Formik>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default AdminSection;
