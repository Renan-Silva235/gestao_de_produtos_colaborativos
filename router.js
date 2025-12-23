import { Router } from "express";
import { ipsFilter } from "./src/middlewares/restrictMiddleware.js";
import RegisterUserController from "./src/controllers/RegisterUserController.js";
import loginRequired from "./src/middlewares/loginRequiredMiddleware.js";

const router = new Router();


//endpoint para registrar funcionário
router.get("/register-employee", loginRequired, RegisterUserController.renderTemplateEmployee);
router.post("/register-employee", loginRequired, RegisterUserController.registerEmployee);

//endpoint para registrar o cliente
router.get("/register-customer", loginRequired, RegisterUserController.renderTemplateCustomer);
router.post("/register-customer", loginRequired, RegisterUserController.registerCustomer);

//endpoint para registrar o doador
router.get("/register-donor", loginRequired, RegisterUserController.renderTemplateDonor);
router.post("/register-donor", loginRequired, RegisterUserController.registerDonor);

export default router;
