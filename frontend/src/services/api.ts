import axios from 'axios';

const apiClient = axios.create({
   baseURL: `${import.meta.env.VITE_APP_BACKEND_ADDRESS}`,
   withCredentials: true,
   withXSRFToken: true
});

if (sessionStorage.getItem('token')) {
   apiClient.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
}
apiClient.interceptors.response.use(
   (response) => response,
   (error) => {
      if (error.response?.status === 401) {
         sessionStorage.removeItem('token');
         axios.defaults.headers.common['Authorization'] = 'Bearer';
      }
      return Promise.reject(error);
   }
);

export default apiClient;
