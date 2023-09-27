import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8081',
    timeout: 5000,
  });
  
// Configuração do CORS
api.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3000';
api.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE';
api.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization';
 
export default api;