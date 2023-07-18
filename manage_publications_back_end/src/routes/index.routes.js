import { ping } from '../controllers/index.controller.js';

import { Router } from "express";

const router = Router();

router.get('/users', ping)

export default router