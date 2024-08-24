import axios from 'axios';

// API base URL
const api = axios.create({
  baseURL: 'https://libmansysv2.onrender.com',
  timeout: 30000, // Timeout süresini arttırdık
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Token'ı localStorage'dan al
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // Varsayılan başlıkları ayarla
    config.headers['Accept'] = 'application/json';
    config.headers['Content-Type'] = 'application/json';

    return config;
  },
  (error) => {
    // Request hatalarını yakala
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Yanıtları doğrudan döndür
    return response;
  },
  (error) => {
    // Yanıt hatalarını yakala
    // Örneğin, yetkilendirme hatası durumunda kullanıcıyı çıkış yapmaya yönlendirebilirsiniz
    if (error.response && error.response.status === 401) {
      // Burada 401 hatası durumunda yapılacak işlemleri belirleyebilirsiniz
      // window.location.href = '/login'; // Örnek yönlendirme
    }
    return Promise.reject(error);
  }
);

export default api;
