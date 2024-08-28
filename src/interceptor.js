import axios from 'axios';

const api = axios.create({
  baseURL: 'https://libmansysv2.onrender.com/',
  timeout: 60000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const noAuthEndpoints = ['/api/register', '/api/authenticate'];

    if (token && !noAuthEndpoints.includes(config.url)) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    if (!(config.data instanceof FormData)) {
      config.headers['Accept'] = 'application/json';
      config.headers['Content-Type'] = 'application/json';
    } else {
      delete config.headers['Content-Type'];
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response, // Başarılı yanıtları olduğu gibi döndür
  (error) => {
    // Hata mesajını al; özel bir mesaj varsa onu, yoksa varsayılan mesajı kullan
    const errorMessage = error.response?.data?.message || "Bir hata oluştu.";

    // Eğer hata yanıtında 401 hatası varsa
    if (error.response && error.response.status === 401) {
      // Kullanıcıyı giriş sayfasına yönlendir
      window.location.href = '/login'; 
    }
    
    // Hata mesajını fırlat; böylece hatayı yakalayan kod bunu işleyebilir
    return Promise.reject(new Error(errorMessage));
  }
);

export default api;