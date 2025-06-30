// bare axios for images.nasa.gov (no key required)
import axios from 'axios';
const searchClient = axios.create({
  baseURL: 'https://images-api.nasa.gov',
  timeout: 10_000
});
export default searchClient;
