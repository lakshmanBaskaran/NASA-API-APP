// src/api/http.js
import axios from 'axios';

// ————————————————————————————————————————————————
// 1) Create an axios instance pointing at your backend
// ————————————————————————————————————————————————
const client = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`, // ✅ uses env variable
  timeout: 10_000,
});

// ————————————————————————————————————————————————
// 2) (Optional) Log every request & response for easier debugging
// ————————————————————————————————————————————————
client.interceptors.request.use((config) => {
  console.log(`→ [API Request] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
  return config;
});

client.interceptors.response.use(
  (res) => {
    console.log(`← [API Response] ${res.status}`, res.data);
    return res;
  },
  (err) => {
    const status = err.response?.status;
    console.error(`← [API Error] ${status}`, err.response?.data || err.message);
    return Promise.reject(err);
  }
);

// ————————————————————————————————————————————————
// 3) Export your four API methods, matching your backend routes:
//    • GET  /api/apod?date=YYYY-MM-DD
//    • GET  /api/eonet?days=<n>
//    • GET  /api/epic
//    • GET  /api/media?q=<query>&media_type=<type>[&page=<n>]
// ————————————————————————————————————————————————
export default {
  // Astronomy Picture of the Day
  getApod: (date) =>
    client.get(`/apod${date ? `?date=${date}` : ''}`).then((r) => r.data),

  // Earth Observatory Natural Event Tracker
  getEonet: (days) =>
    client.get(`/events?days=${days}`).then((r) => r.data),

  // Earth Polychromatic Imaging Camera archive
  getEpic: () =>
    client.get('/epic/latest').then((r) => r.data),

  // NASA Media search
  mediaSearch: ({ query, mediaType, page = 1 }) =>
    client
      .get(
        `/media?q=${encodeURIComponent(query)}&media_type=${encodeURIComponent(
          mediaType
        )}&page=${page}`
      )
      .then((r) => r.data),
};
