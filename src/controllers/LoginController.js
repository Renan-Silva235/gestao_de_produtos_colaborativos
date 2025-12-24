import LoginModel from "../models/LoginModel.js";

class LoginController{
    renderTemplateLoginCustomer(request, response){
        response.render("loginCustomer");
        return;
    }

    renderTemplateLoginEmployee(request, response){
        response.render("loginEmployee");
        return;
    }

    async login(request, response){
        try {
            const login = new LoginModel(request.body);
            await login.login();
            request.session.user = login.user;
            request.flash("success", "Login realizado com sucesso");
            const urlDestiny = login.user.level === "Customer" ? "/menu-customer" : "/menu-employee";
            request.session.save(() => {
                response.status(200).redirect(urlDestiny);
            });
            return;
        } catch (error) {
            request.flash("errors", error.message);
            request.session.save(() => {
                response.status(401).redirect(request.get("referrer"));
            });
            return;
        }
    }
}
export default new LoginController();
