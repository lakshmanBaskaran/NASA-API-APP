import { Router } from "express";
import apod from "./apod.js";
import events from "./events.js";
import epic     from "./epic.js";
import media from "./media.js";
import search from './search.js';

const router = Router();
router.use("/apod", apod);
router.use("/events", events);
router.use("/epic",   epic);
router.use("/media", media);
router.use('/search', search);

export default router;
