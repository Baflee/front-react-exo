import React from "react";
import { Formik, Field, Form } from "formik";

export default function CategoryForm({ categories, handleSubmit, handleDelete }) {
  return (
    <div className="grid grid-cols-2">
      <Formik initialValues={{ name: "" }} onSubmit={handleSubmit}>
        <Form>
          <Field name="name" placeholder="Category Name" />
          <button type="submit">Créer</button>
        </Form>
      </Formik>
      <Formik initialValues={{ name: "" }} onSubmit={handleDelete}>
        <Form>
          <Field as="select" name="name">
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </Field>
          <button type="submit">Supprimer</button>
        </Form>
      </Formik>
    </div>
  );
}