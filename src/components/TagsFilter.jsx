import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function TagsFilter() {
  const [categories, setCategories] = useState([]);
  const { name: selectedCategory } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const json = await response.json();
        setCategories(json);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName) => {
    if (categoryName === selectedCategory) {
      navigate("/"); // Navigate to home if the category is already selected
    } else {
      navigate(`/category/${categoryName}`);
    }
  };

  return (
    <>
      {categories?.length > 0 && (
        <>
          <p className="py-6 text-6xl text-center text-black font-justicefest">
            Filtrer par Catégorie :
          </p>
          <div className="grid grid-cols-2 gap-4 px-6 py-6 bg-white rounded-lg shadow-none sm:grid-cols-4">
            {categories.map((category) => (
              <div
                key={category._id}
                onClick={() => handleCategoryClick(category.name)}
                className={`cursor-pointer font-doodles text-2xl sm:text-3xl text-center px-4 py-3 rounded-lg border-4 border-black transition-transform duration-300 ease-in-out transform hover:scale-105 ${
                  category.name === selectedCategory
                    ? "bg-gray-300 text-black border-gray-500"
                    : "bg-white text-black"
                }`}
              >
                {category.name}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default TagsFilter;
