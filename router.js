import { Router } from "express";
import TestController from "./src/controllers/TestController.js"
const router = new Router();

//rotas para testes
router.get("/tests", TestController.runTest);


export default router;
