import { Router } from "express";
import cache from "../cache.js";
import axios from "axios";

const router = Router();

// NASA Image & Video Library is a separate domain (no key required)
router.get("/", async (req, res, next) => {
  try {
    const {
      q = "earth",
      media_type,
      year_start,
      year_end,
      page = 1,
      sort = "newest",
    } = req.query;

    let url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(q)}&page=${page}`;
    if (media_type) url += `&media_type=${media_type}`;
    if (year_start) url += `&year_start=${year_start}`;
    if (year_end)   url += `&year_end=${year_end}`;

    if (cache.has(url)) return res.json(cache.get(url));

    const { data } = await axios.get(url);
    const items = data.collection.items.sort((a, b) => {
      const d1 = new Date(a.data[0].date_created);
      const d2 = new Date(b.data[0].date_created);
      return sort === "oldest" ? d1 - d2 : d2 - d1;
    });

    cache.set(url, items);
    res.json(items);
  } catch (err) {
    next(err);
  }
});

export default router;
