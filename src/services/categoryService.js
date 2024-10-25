  export async function fetchCategories() {
    const response = await fetch("/api/categories");
    return response.json();
  }
  
  export async function createCategory(name, token) {
    const response = await fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${token}`,
      },
      body: JSON.stringify({ name }),
    });
    return response.json();
  }
  
  export async function deleteCategory(name, token) {
    const response = await fetch("/api/categories", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${token}`,
      },
      body: JSON.stringify({ name }),
    });
    return response.json();
  }
  