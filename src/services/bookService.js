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
    throw error;

  }
};

export const fetchBookDetails = async (id) => {
  try {
    const response = await api.get(`/api/books/getBookById/${id}`);
    return response.data;
  } catch (error) {
    throw error;
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
    throw error;
  }
};

export const fetchUserLoans = async (userId) => {
  try {
    const response = await api.get(`/api/users/getUserLoans/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const returnBook = async (userId, bookId) => {
  try {
    const response = await api.post(`/api/loans/return`, null, {
      params: { userId, bookId },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};