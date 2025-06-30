import axios from "axios";

// Pre-configured Axios instance for all NASA calls
const nasa = axios.create({
  baseURL: "https://api.nasa.gov",
  timeout: 10_000,
  params: { api_key: process.env.NASA_KEY },
});

// Simple retry on transient 5xx errors
nasa.interceptors.response.use(
  res => res,
  async err => {
    const { config, response } = err;
    if (response && response.status >= 500 && !config.__retry) {
      config.__retry = true;
      await new Promise(r => setTimeout(r, 500));
      return nasa(config);
    }
    return Promise.reject(err);
  }
);

export default nasa;
