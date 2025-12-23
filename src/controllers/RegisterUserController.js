import RegisterUserModel from "../models/RegisterUserModel.js";


class RegisterUserController{

    renderTemplateEmployee(request, response){
        response.status(200).render("registerEmployee");
        return;
    }

    async registerEmployee(request, response){

        try{
            const register = new RegisterUserModel(request.body);
            await register.registerEmployee();
            request.flash("success", "Funcionário cadastrado com sucesso.");
            request.session.save(() => {
                response.redirect("/register-employee");
            });
            return;
        }catch(error){
            request.flash("errors", error.message);
            request.session.save(() => {
                response.redirect("/register-employee");
            });
            return;
        }
    }

    renderTemplateCustomer(request, response){
        response.status(200).render("registerCustomer");
        return;
    }

    async registerCustomer(request, response){
        try {
            const register = new RegisterUserModel(request.body);
            await register.registerCustomer(request.session.user.id);
            request.flash("success", "Cliente cadastrado com sucesso");
            request.session.save(() => {
                response.redirect("/register-customer");
            });
            return;

        } catch (error) {
            request.flash("errors", error.message);
            request.session.save(() => {
                response.redirect("/register-customer");
            });
            return;
        }
    }

    renderTemplateDonor(request, response){
        response.status(200).render("registerDonor");
        return;
    }

    async registerDonor(request, response){
        try {
            const register = new RegisterUserModel(request.body);
            await register.registerDonor(request.session.user.id);
            request.flash("success", "Doador cadastrado com sucesso.");
            request.session.save(() => {
                response.redirect("/register-donor");
            });
            return;
        } catch (error) {
            request.flash("errors", error.message);
            request.session.save(() => {
                response.redirect("/register-donor");
            });
            return;
        }
    }



}


export default new RegisterUserController();
