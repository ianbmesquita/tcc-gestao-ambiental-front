import axios from 'axios'

const api2 = axios.create({
    baseURL: 'http://localhost:8082',
    timeout: 5000,
  });
  
// Configuração do CORS
api2.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3000';
api2.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE';
api2.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization';
 
export default api2;