import { Router } from "express";
import { ipsFilter } from "./src/middlewares/restrictMiddleware.js";
import RegisterUserController from "./src/controllers/RegisterUserController.js";
import loginController from "./src/controllers/LoginController.js";
import loginRequired from "./src/middlewares/loginRequiredMiddleware.js";
import indexController from "./src/controllers/IndexController.js";
const router = new Router();


//endpoint para registrar funcionário
router.get("/register-employee", ipsFilter, loginRequired, RegisterUserController.renderTemplateEmployee);
router.post("/register-employee", ipsFilter, loginRequired, RegisterUserController.registerEmployee);

//endpoint para registrar o cliente
router.get("/register-customer", ipsFilter, loginRequired, RegisterUserController.renderTemplateCustomer);
router.post("/register-customer", ipsFilter , loginRequired, RegisterUserController.registerCustomer);

//endpoint para registrar o doador
router.get("/register-donor", ipsFilter, loginRequired, RegisterUserController.renderTemplateDonor);
router.post("/register-donor", ipsFilter, loginRequired, RegisterUserController.registerDonor);

//endpoint para login do cliente
router.get("/login/customer", loginController.renderTemplateLoginCustomer);
router.post("/login/customer", loginController.login);

//endpoint para o login do funcionário
router.get("/login/employee", ipsFilter, loginController.renderTemplateLoginEmployee);
router.post("/login/employee", ipsFilter, loginController.login);

//endpoint para menu do cliente
router.get("/menu-customer", loginRequired, indexController.renderTemplateMenuCustomer);

export default router;
