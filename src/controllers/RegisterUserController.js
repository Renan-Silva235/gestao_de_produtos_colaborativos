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
            return response.redirect("/register-employee");
        }catch(error){
            request.flash("errors", error.message);
            return response.redirect("/register-employee");
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
            return response.redirect("/register-customer");

        } catch (error) {
            request.flash("errors", error.message);
            return response.redirect("/register-customer");
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
            return response.redirect("/register-donor");
        } catch (error) {
            request.flash("errors", error.message);
            return response.redirect("/register-donor");
        }
    }



}


export default new RegisterUserController();
