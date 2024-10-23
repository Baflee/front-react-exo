import { Formik, Field, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function SignUp() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex items-center content-center self-center justify-center">
      {!user ? (
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => {
            await new Promise((resolve) => setTimeout(resolve, 500));

            try {
              const response = await fetch("api/users/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email: values.email,
                  password: values.password,
                }),
              });

              if (response.ok) {
                // If the request was successful, navigate to the login page
                navigate("/login");
              } else {
                // If the request failed, show the error message from the response
                const errorResult = await response.json();
                setMessage(errorResult.error || "Failed to create an account.");
              }
            } catch (error) {
              setMessage("An error occurred. Please try again later.");
            }
          }}
        >
          <div className="flex grid items-center content-center self-center justify-center grid-cols-1 px-24 py-24 mx-10 my-32 bg-cover bg-logincadre gap-14">
            <Link to="/">
              <img alt="mini logo" src="/images/ReadmeMini.png" />
            </Link>
            <p className="text-4xl font-justicefest" type="submit">
              Inscription :
            </p>
            <Form>
              <label className="flex text-2xl font-doodles">
                Email :
                <Field
                  name="email"
                  type="email"
                  placeholder="youremail@example.com"
                  required="required"
                />
              </label>
              <label className="flex text-2xl font-doodles">
                Mot de Passe :
                <Field
                  name="password"
                  type="password"
                  placeholder="password123"
                  required="required"
                />
              </label>
              <button className="text-4xl font-doodles" type="submit">
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
      <div className="font-doodles text-4xl mt-3.5">{message}</div>
    </div>
  );
}

export default SignUp;