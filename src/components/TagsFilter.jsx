import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

function TagsFilter() {
  const [categories, setCategories] = useState(null);
  const params = useParams();

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
        Filtre :
      </p>
      <div className="bg-white flex grid grid-cols-4 self-center items-center justify-center">
        {categories
          ? categories.map((category) => {
              return (
                <Link
                  to={{
                    pathname: `/category/${category.name}`,
                  }}
                  key={category._id}
                >
                  <div
                    className={`font-doodles border-b border-t border-solid border-black px-2 py-2 mt-2 mx-4 text-4xl rounded-md ${
                      category.name === params.name
                        ? "bg-green-400"
                        : "bg-white"
                    }`}
                  >
                    {category.name}
                  </div>
                </Link>
              );
            })
          : ""}
      </div>
    </>
  );
}

export default TagsFilter;
