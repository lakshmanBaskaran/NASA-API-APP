import { Router } from "express";
import cache from "../cache.js";
import nasa from "../nasaClient.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { date, random } = req.query;

    let url = "/planetary/apod";
    if (date)   url += `?date=${date}`;
    if (random) url += `?count=1`;

    if (cache.has(url)) return res.json(cache.get(url));

    const { data } = await nasa.get(url);
    cache.set(url, data);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
