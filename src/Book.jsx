import Header from "./components/Header";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

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
          <div className="flex self-center items-center justify-center gap-24 grid grid-cols-2 mx-10">
            <div className="font-justicefest flex self-center items-center justify-center text-6xl grid grid-cols-2">
              <div className="flex self-center items-center justify-center">
                {book.images.length === 0 ? (
                  <img src="/images/cadre.png" className={`object-contain`} />
                ) : (
                  <img src={book.images[0]} className={`object-contain`} />
                )}
              </div>
              <div className="flex self-center items-center justify-center">
                <p className="font-justicefest">{book.title}</p>
              </div>
              <div className="font-doodles flex self-center items-center justify-center m-10">
                Auteur : {book.author}
              </div>
              <div className="font-doodles flex self-center items-center justify-center m-10">
                Editeur : {book.author}
              </div>
              <div className="font-doodles flex self-center items-center justify-center m-10">
                Date : {book.publishingyear}
              </div>
              <div className="font-doodles flex self-center items-center justify-center m-10">
                Stock : {book.stock}
              </div>
              <div className="font-doodles flex self-center items-center justify-center m-10">
                Pages : {book.pagenumber}
              </div>
              <div className="font-doodles flex self-center items-center justify-center m-10">
                Prix : {book.price} €
              </div>
            </div>
            <div className="flex self-center border-r border-r-black border-l border-l-black items-center justify-center text-4xl grid grid-cols-1 p-3.5">
              <p className="font-doodles">{book.description}</p>
              <p className="font-justicefest my-10">
                Revue des bibliothécaires :
              </p>
              <p className="font-doodles">{book.librarianreview}</p>
              <Link to={{ pathname: `/` }}>
                <div className="font-justicefest mt-10 text-6xl">Retour</div>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="font-justicefest flex self-center items-center justify-center text-8xl">
          Livre Introuvable
        </div>
      )}
    </div>
  );
}

export default Book;
