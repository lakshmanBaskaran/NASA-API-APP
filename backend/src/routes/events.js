// backend/src/routes/events.js
import { Router } from "express";
import cache from "../cache.js";
import eonet from "../eonetClient.js";

const router = Router();

/**
 * GET /api/events
 *
 * Query params:
 *   category  – comma-sep category IDs or slugs (e.g. wildfires, volcanoes)
 *   days      – look-back window (default 10)
 *   status    – open | closed
 *   bbox      – minLon,minLat,maxLon,maxLat
 *   sort      – newest | oldest   (default newest)
 */
router.get("/", async (req, res, next) => {
  try {
    const { category, days = 10, status, bbox, sort = "newest" } = req.query;

    // Build query string for EONET
    let url = `/events?days=${days}`;
    if (category) url += `&category=${category}`;
    if (status)   url += `&status=${status}`;
    if (bbox)     url += `&bbox=${bbox}`;

    // Serve from cache if we already have it
    if (cache.has(url)) return res.json(cache.get(url));

    // Fetch from NASA EONET service
    const { data } = await eonet.get(url);

    // Optional server-side sort
    const sorted = data.events.sort((a, b) => {
      const d1 = new Date(a.geometry[0].date);
      const d2 = new Date(b.geometry[0].date);
      return sort === "oldest" ? d1 - d2 : d2 - d1;
    });

    cache.set(url, sorted);
    res.json(sorted);
  } catch (err) {
    next(err);
  }
});

export default router;
