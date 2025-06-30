// backend/src/eonetClient.js
import axios from "axios";

/**
 * Pre-configured Axios instance for EONET v3
 * (no API key required)
 */
const eonet = axios.create({
  baseURL: "https://eonet.gsfc.nasa.gov/api/v3",
  timeout: 10_000,
});

export default eonet;   // ← THIS must be present
