import api from "../interceptor";

export const fetchBooks = async (searchTerm, page = 0) => {
  try {
    const response = await api.get("/api/books/searchSingle", {
      params: {
        searchTerm,
        page,
        size: 12,
        sort: "id,asc"
      },
    });
    return {
      content: response.data.content || [],
      totalElements: response.data.totalElements,
    };
  } catch (error) {
    throw new Error("Kitaplar yüklenirken bir hata oluştu.");
  }
};

export const fetchBookDetails = async (id) => {
  try {
    const response = await api.get(`/api/books/getBookById/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Kitap detayları fetch hatası.");
  }
};

export const borrowBook = async (userId, token, bookId) => {
  try {
    const response = await api.post(`/api/loans/borrow`, null, {
      params: { userId, bookId },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response;
  } catch (error) {
    throw new Error("Kitap ödünç alma hatası.");
  }
};
