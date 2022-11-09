import Header from "./components/Header";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

function Book() {
  const [book, setBook] = useState(null);

  const params = useParams();

  console.log(params);

  React.useEffect(() => {
    const fetchBook = async () => {
      const data = await fetch("/api/books/" + params.id);
      const json = await data.json();
      setBook(json);
    };

    fetchBook().catch(console.error);
  }, []);

  return (
    <div>
      <Header />
      {book ? (
        <div className="flex self-center items-center justify-center my-12">
          <div className="flex self-center items-center justify-center">
            <img src="/images/cadre.png" className={`object-contain`} />
          </div>
          <div className="flex self-center items-center justify-center gap-24">
            <div className="font-justicefest flex self-center items-center justify-center text-8xl grid grid-cols-1">
              <p className="font-justicefest">Titre : {book.title}</p>
              <p className="font-doodles">Auteur : {book.author}</p>
              <p className="font-doodles">
                Date de Sortie : {book.publishingyear}
              </p>
            </div>
          </div>
        </div>
      ) : (
        "test"
      )}
    </div>
  );
}

export default Book;
