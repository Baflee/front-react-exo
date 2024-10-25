  export async function fetchBook(id) {
    try {
      const data = await fetch(`/api/books/${id}`);
      const json = await data.json();
      return json
    } catch (error) {
      console.error("Failed to fetch the book:", error);
    }
  };
  
  export async function createBook(bookData, token) {
    const response = await fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${token}`,
      },
      body: JSON.stringify(bookData),
    });
    return response.json();
  }

  export async function updateBook(bookData, token) {
    const response = await fetch(`/api/books/${bookData.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${token}`,
      },
      body: JSON.stringify(bookData),
    });
    return response.json();
  }

  const deleteBook = async () => {
    try {
      const data = await fetch("/api/books", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + userStorage.token,
        },
        body: JSON.stringify({ _id: params.id }),
      });
      const json = await data.json();
      if (json.message === "Livre Supprimé") {
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to delete the book:", error);
    }
  };
  