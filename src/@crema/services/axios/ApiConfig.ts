import axios from 'axios';

const apiConfig = axios.create({
  baseURL: '/api/',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});
export default apiConfig;


// import axios from 'axios';

// const apiConfig = axios.create({
//   baseURL: 'http://localhost:4000/api/',
//   headers: {
//     'Content-Type': 'application/json',
//     'Access-Control-Allow-Origin': '*',
//   },
// });
// export default apiConfig;
