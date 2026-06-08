import axios from "axios";

// TODO: use env files for frontend
/*
    npm run dev
    .env.development 
    VITE_API_URL=http://localhost:8000

    npm run build
    .env.production 
    VITE_API_URL=https://api.yourdomain.com

    import.meta.env.VITE_API_URL
*/
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// api token we will get once we login
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// TODO: if we get 401'd try to login again to get a new token
// else the server is probably down

// axiosInstance.interceptors.response.use

export default axiosInstance;
