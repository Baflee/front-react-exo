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
      <p className="font-justicefest text-6xl py-3.5 flex self-center items-center justify-center">
        Section Admin :
      </p>
      <p className="font-justicefest text-6xl py-3.5 flex self-center items-center justify-center">
        {messageBook}
      </p>
      <div className="flex self-center items-center justify-center grid grid-cols-2 gap-10">
        <div className="flex self-center items-center justify-center">
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
        <div className="flex self-center items-center justify-center">
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
              <div className="flex self-center bg-logincadre bg-cover px-24 mt-2 mb-15 mx-10 py-24 items-center justify-center content-center grid grid-cols-1 gap-14">
                <Link to="/">
                  <img alt="mini logo" src="/images/ReadmeMini.png" />
                </Link>
                <p className="font-justicefest text-6xl" type="submit">
                  Créer une page de livre :
                </p>
                <form onSubmit={handleSubmit}>
                  <label className="flex font-doodles text-2xl">
                    Images :
                    <input
                      name="images"
                      type="text"
                      required="required"
                      defaultValue="/images/cadre.png"
                      onChange={handleChangeArray}
                    />
                  </label>
                  <label className="flex font-doodles text-2xl">
                    Titre :
                    <input
                      name="title"
                      type="text"
                      required="required"
                      onChange={handleChange}
                    />
                  </label>
                  <label className="flex font-doodles text-2xl">
                    Auteur :
                    <input
                      name="author"
                      type="text"
                      required="required"
                      onChange={handleChange}
                    />
                  </label>
                  <label className="flex font-doodles text-2xl">
                    Editeur :
                    <input
                      name="editor"
                      type="text"
                      required="required"
                      onChange={handleChange}
                    />
                  </label>
                  <label className="flex font-doodles text-2xl">
                    Categories :
                    <input
                      name="categories"
                      type="text"
                      required="required"
                      defaultValue="6346bd769c7d54cc95b82beb"
                      onChange={handleChangeArray}
                    />
                  </label>
                  <label className="flex font-doodles text-2xl">
                    Description :
                    <input
                      name="description"
                      type="text"
                      required="required"
                      onChange={handleChange}
                    />
                  </label>
                  <label className="flex font-doodles text-2xl">
                    Stock :
                    <input
                      name="stock"
                      type="number"
                      required="required"
                      onChange={handleChange}
                    />
                  </label>
                  <label className="flex font-doodles text-2xl">
                    Prix :
                    <input
                      name="price"
                      type="number"
                      required="required"
                      onChange={handleChange}
                    />
                  </label>
                  <label className="flex font-doodles text-2xl">
                    isbn :
                    <input
                      name="isbn"
                      type="text"
                      required="required"
                      onChange={handleChange}
                    />
                  </label>
                  <label className="flex font-doodles text-2xl">
                    Nombre de Page :
                    <input
                      name="pagenumber"
                      type="number"
                      required="required"
                      onChange={handleChange}
                    />
                  </label>
                  <label className="flex font-doodles text-4xl">
                    Annee de Publication :
                    <input
                      name="publishingyear"
                      type="number"
                      required="required"
                      onChange={handleChange}
                    />
                  </label>
                  <label className="flex font-doodles text-4xl">
                    Avis du Libraire :
                    <input
                      name="librarianreview"
                      type="text"
                      onChange={handleChange}
                    />
                  </label>
                  <button className="font-doodles text-6xl otdds" type="submit">
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
                    await new Promise((resolve) => setTimeout(resolve, 500));

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
                  <div className="flex self-center bg-logincadre bg-cover px-20 my-2 mx-10 py-32 items-center justify-center content-center grid grid-cols-1 gap-14">
                    <Link to="/">
                      <img alt="mini logo" src="/images/ReadmeMini.png" />
                    </Link>
                    <p className="font-justicefest text-4xl" type="submit">
                      Création de catégorie :
                    </p>
                    <Form>
                      <label className="flex font-doodles text-2xl">
                        Nom :
                        <Field
                          name="name"
                          type="name"
                          placeholder="Horreur"
                          required="required"
                        />
                      </label>
                      <button className="font-doodles text-4xl" type="submit">
                        Créer
                      </button>
                    </Form>
                  </div>
                </Formik>
                <Formik
                  initialValues={{ name: "" }}
                  onSubmit={async (values) => {
                    await new Promise((resolve) => setTimeout(resolve, 500));

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
                  <div className="flex self-center bg-logincadre bg-cover px-20 my-2 mx-10 py-32 items-center justify-center content-center grid grid-cols-1 gap-14">
                    <Link to="/">
                      <img alt="mini logo" src="/images/ReadmeMini.png" />
                    </Link>
                    <p className="font-justicefest text-4xl" type="submit">
                      Suppresion d'une catégorie :
                    </p>
                    <Form>
                      <label className="flex font-doodles text-2xl">
                        Nom :
                        <Field
                          as="select"
                          name="name"
                          placeholder="Horreur"
                          required="required"
                        >
                          {categories
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
                      <button className="font-doodles text-4xl" type="submit">
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
  );
}

export default AdminSection;
