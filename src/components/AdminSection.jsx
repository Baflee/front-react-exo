import React, { useState, useEffect } from "react";
import BookForm from "./Book/BookForm";
import CategoryForm from "./Category/CategoryForm";
import { fetchCategories, createCategory, deleteCategory } from "../services/categoryService";
import { createBook } from "../services/bookService"

export default function AdminSection() {
  const [bookSection, setBookSection] = useState(false);
  const [categorySection, setCategorySection] = useState(false);
  const [categories, setCategories] = useState([]);
  const [messageBook, setMessageBook] = useState(null);
  const [messageCat, setMessageCat] = useState(null);
  const userStorage = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);
    };
    loadCategories();
  }, []);

  const handleBookSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    const response = await createBook(values, userStorage.token);
    setMessageBook(response.message || response.error);
    setSubmitting(false);
  };

  const handleCategorySubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    const response = await createCategory(values.name, userStorage.token);
    setMessageCat(response.message || response.error);
    setSubmitting(false);
  };

  const handleCategoryDelete = async (values, { setSubmitting }) => {
    setSubmitting(true);
    const response = await deleteCategory(values.name, userStorage.token);
    setMessageCat(response.message || response.error);
    setSubmitting(false);
  };

  return (
    <div>
      {userStorage && userStorage.isAdmin && (
        <>
          <Header messageBook={messageBook} messageCat={messageCat} />
          <ToggleButtons
            bookSection={bookSection}
            categorySection={categorySection}
            setBookSection={setBookSection}
            setCategorySection={setCategorySection}
          />
          {bookSection && (
            <BookForm categories={categories} handleSubmit={handleBookSubmit} />
          )}
          {categorySection && (
            <CategoryForm
              categories={categories}
              handleSubmit={handleCategorySubmit}
              handleDelete={handleCategoryDelete}
            />
          )}
        </>
      )}
    </div>
  );
}