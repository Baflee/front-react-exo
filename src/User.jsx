import Header from "./components/Header";
import { Formik, Field, Form } from "formik";
import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function User() {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const userStorage = JSON.parse(localStorage.getItem("user"));

  const params = useParams();

  console.log(params);

  function deleteProfile() {
    const deleteUser = async () => {
      const data = await fetch("/api/users/", {
        method: "delete",
        mode: "cors",
        headers: new Headers({
          Authorization: "Basic " + userStorage.token,
        }),
        body: JSON.stringify({
          _id: params.id,
        }),
      });
      console.log(params.id);
      console.log("test : " + JSON.stringify(data));
    };

    deleteUser().catch(console.error);
    navigate("/");
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
              <div className="font-doodles flex self-center items-center justify-center">
                <button
                  onClick={() => deleteProfile()}
                  className="bg-buttoncadre bg-cover font-doodles flex self-center items-center justify-center text-3xl py-28 px-14"
                >
                  Supprimer le Profile ?
                </button>
                <Formik
                  initialValues={{ email: "", password: "" }}
                  onSubmit={async (values) => {
                    await new Promise((resolve) => setTimeout(resolve, 500));

                    console.log(
                      "test 0 : " + JSON.stringify(values) + " " + values.email
                    );

                    try {
                      await fetch("/api/users", {
                        method: "patch",
                        mode: "cors",
                        headers: new Headers({
                          "Content-Type": "application/json",
                          Authorization: "Basic " + userStorage.token,
                        }),
                        body: JSON.stringify({
                          email: values.email,
                          password: values.password,
                        }),
                      })
                        .then((response) => response.json())
                        .then((result) => {
                          console.log("test : " + JSON.stringify(result));
                          if (result.message === "Utilisateur modifié") {
                            navigate("/");
                          } else if (result.message) {
                            setMessage(result.message);
                          } else {
                            setMessage(result.error);
                          }
                        });
                    } catch (error) {
                      setMessage(error);
                    }
                  }}
                >
                  <div className="flex self-center bg-logincadre bg-cover px-36 my-32 mx-10 py-40 items-center justify-center content-center grid grid-cols-1 gap-14">
                    <Link to="/">
                      <img src="/images/ReadmeMini.png" />
                    </Link>
                    <p className="font-justicefest text-4xl" type="submit">
                      Editer Profile :
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
                        Password :
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
        <div className="font-justicefest flex self-center items-center justify-center text-8xl">
          Utilisateur Introuvable
        </div>
      )}
    </div>
  );
}

export default User;
