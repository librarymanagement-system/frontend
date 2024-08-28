import api from "../interceptor";

export const fetchBooks = async (page = 0, size = 28, sort = "id,asc") => {
  try {
    const response = await api.get("/api/books/getAllBooks", {
      params: {
        page,
        size,
        sort,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addBook = async (bookData) => {
  try {
    const response = await api.post("/api/books/addBook", bookData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    throw new Error("Kitap eklenirken bir hata oluştu.");
  }
};

export const removeBook = async (bookId) => {
  try {
    await api.delete(`/api/books/${bookId}`);
  } catch (error) {
    throw error;
  }
};

export const exportBooks = async () => {
  try {
    const response = await api.get("/api/books/export", {
      responseType: "blob",
    });
    return response;
  } catch (error) {
    throw error;

  }
};
