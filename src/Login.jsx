import { Formik, Field, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex self-center items-center justify-center content-center">
      {!user ? (
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => {
            await new Promise((resolve) => setTimeout(resolve, 500));

            try {
              await fetch("api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email: values.email,
                  password: values.password,
                }),
              })
                .then((response) => response.json())
                .then((result) => {
                  if (result.message === "Compte connecté !") {
                    localStorage.setItem(
                      "user",
                      JSON.stringify({
                        _id: result.user._id,
                        email: result.user.email,
                        token: result.user.token,
                        isAdmin: result.user.isAdmin,
                      })
                    );
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
          <div className="flex self-center bg-logincadre bg-cover px-24 my-32 mx-10 py-24 items-center justify-center content-center grid grid-cols-1 gap-14">
            <Link to="/">
              <img alt="mini logo" src="/images/ReadmeMini.png" />
            </Link>
            <p className="font-justicefest text-4xl" type="submit">
              Connexion :
            </p>
            <Form>
              <label className="flex font-doodles text-2xl">
                Email :
                <Field
                  name="email"
                  type="email"
                  placeholder="youremail@example.com"
                  required="required"
                />
              </label>
              <label className="flex font-doodles text-2xl">
                Mot de Passe :
                <Field
                  name="password"
                  type="password"
                  placeholder="password123"
                  required="required"
                />
              </label>
              <button className="font-doodles text-4xl" type="submit">
                Envoyer
              </button>
              <Link to="/">
                <p className="font-doodles text-4xl mt-3.5">Retour</p>
              </Link>
            </Form>
          </div>
        </Formik>
      ) : (
        <div></div>
      )}
      ;<div className="font-doodles text-4xl mt-3.5">{message}</div>
    </div>
  );
}

export default Login;
