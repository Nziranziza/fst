import { Router } from "express";

import { play } from "../controller";

const router = Router();

router.get('/play', play);

export default router;
