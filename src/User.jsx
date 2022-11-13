import Header from "./components/Header";
import { Formik, Field, Form } from "formik";
import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function User() {
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const userStorage = JSON.parse(localStorage.getItem("user"));

  const params = useParams();

  function deleteProfile() {
    let data = {};
    const deleteUser = async () => {
      data = await fetch("/api/users", {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: "Basic " + userStorage.token,
        }),
        body: JSON.stringify({
          _id: params.id,
        }),
      });

      const json = await data.json();

      if (json.message === "Compte Supprimé") {
        if (user._id === userStorage._id) {
          localStorage.clear();
        }
        navigate("/");
      }
    };

    deleteUser();
  }

  React.useEffect(() => {
    const fetchUser = async () => {
      const data = await fetch("/api/users/" + params.id, {
        headers: new Headers({
          Authorization: "Basic " + userStorage.token,
        }),
      });
      const json = await data.json();
      setUser(json);
    };

    fetchUser().catch(console.error);
  }, []);

  return (
    <div>
      <Header />
      {user ? (
        <div className="flex self-center items-center justify-center grid grid-cols-1">
          {userStorage.isAdmin === true || user._id === userStorage._id ? (
            <div>
              <p className="font-doodles flex self-center items-center justify-center text-8xl pt-12">
                {user.email}
              </p>
              <p className="font-doodles flex self-center items-center justify-center text-2xl py-12">
                {message}
              </p>
              <div className="font-doodles flex self-center items-center justify-center">
                <button
                  onClick={() => deleteProfile()}
                  className="bg-buttoncadre bg-cover font-doodles flex self-center items-center justify-center text-3xl py-28 px-14"
                >
                  Supprimer le Profil ?
                </button>
                <Formik
                  initialValues={{ email: "", password: "" }}
                  onSubmit={(values) => {
                    let customBody = {};

                    if (values.email && values.password) {
                      customBody = {
                        _id: user._id,
                        email: values.email,
                        password: values.password,
                      };
                    } else if (values.email) {
                      customBody = {
                        _id: user._id,
                        email: values.email,
                      };
                    } else if (values.password) {
                      customBody = {
                        _id: user._id,
                        password: values.password,
                      };
                    } else if (!values.email && !values.password) {
                      setMessage(
                        "Erreur : Il faut au moins remplir une des cases"
                      );
                    }

                    fetch("/api/users", {
                      method: "PATCH",
                      headers: new Headers({
                        "Content-Type": "application/json",
                        Authorization: "Basic " + userStorage.token,
                      }),
                      body: JSON.stringify(customBody),
                    })
                      .then((response) => response.json())
                      .then((result) => {
                        if (result.message === "Utilisateur modifié") {
                          navigate("/");
                        } else if (result.message) {
                          setMessage(result.message);
                        } else {
                          setMessage(result.error);
                        }
                        console.log(customBody);
                        console.log(message);
                      });
                  }}
                >
                  <div className="flex self-center bg-logincadre bg-cover px-32 my-32 mx-10 py-40 items-center justify-center content-center grid grid-cols-1 gap-14">
                    <Link to="/">
                      <img alt="mini logo" src="/images/ReadmeMini.png" />
                    </Link>
                    <p className="font-justicefest text-4xl" type="submit">
                      Editer Profil :
                    </p>
                    <Form>
                      <label className="flex font-doodles text-2xl">
                        Email :
                        <Field
                          name="email"
                          type="email"
                          placeholder="youremail@example.com"
                        />
                      </label>
                      <label className="flex font-doodles text-2xl">
                        Mot de Passe :
                        <Field
                          name="password"
                          type="password"
                          placeholder="password123"
                        />
                      </label>
                      <button className="font-doodles text-4xl" type="submit">
                        Modifier
                      </button>
                    </Form>
                  </div>
                </Formik>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default User;
