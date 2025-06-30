// backend/src/routes/epic.js
import { Router } from 'express';
import nasa from '../nasaClient.js';   // axios instance → https://api.nasa.gov + api_key

const router = Router();

/**
 * GET /api/epic/latest
 * Returns the most-recent EPIC (DSCOVR) natural‐color frame +
 * its centroid lat/lon so the frontend can drop a marker.
 */
router.get('/latest', async (req, res, next) => {
  try {
    // 1️⃣ fetch the list – newest first
    const { data: frames } = await nasa.get('/EPIC/api/natural'); // ← array
    if (!frames.length) return res.status(502).json({ error: 'NASA EPIC returned empty list' });

    const latest = frames[0];
    // 2️⃣ build the public JPEG URL
    const [yyyy, mm, dd] = latest.date.split(' ')[0].split('-');
    const imgUrl = `https://epic.gsfc.nasa.gov/archive/natural/${yyyy}/${mm}/${dd}/png/${latest.image}.png`;

    res.json({
      date: latest.date,
      centroid_coordinates: latest.centroid_coordinates, // { lat, lon }
      caption: latest.caption,
      url: imgUrl
    });
  } catch (err) {
    next(err);
  }
});

export default router;
