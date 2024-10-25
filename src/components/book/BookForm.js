import React from "react";
import { Formik, Form } from "formik";

export default function BookForm({ _, handleSubmit }) {
  const initialValues = {
    images: ["/images/cadre.png"],
    title: "",
    author: "",
    editor: "",
    categories: [],
    description: "",
    stock: "",
    isbn: "",
    pagenumber: "",
    price: "",
    publishingyear: "",
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form>
          {/* Form fields like title, author, editor, etc. */}
          <button type="submit" disabled={isSubmitting}>
            Envoyer
          </button>
        </Form>
      )}
    </Formik>
  );
}
