import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function TagsFilter() {
  const [categories, setCategories] = useState([]);
  const { name: selectedCategory } = useParams(); // Destructuring for clarity

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        const json = await response.json();
        setCategories(json);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      {categories?.length > 0 && (
        <>
          <p className="font-justicefest text-6xl py-3.5 flex self-center items-center justify-center">
            Filtre :
          </p>
          <div className="flex grid items-center self-center justify-center grid-cols-4 bg-white">
            {categories.map((category) => (
              <Link
                key={category._id} // Key moved to the Link
                to={`/category/${category.name}`}
              >
                <div
                  className={`font-doodles border-b border-t border-solid border-black px-2 py-2 mt-2 mx-4 text-4xl rounded-md ${
                    category.name === selectedCategory ? "bg-green-400" : "bg-white"
                  }`}
                >
                  {category.name}
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default TagsFilter;

