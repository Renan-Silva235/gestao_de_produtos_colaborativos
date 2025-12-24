class IndexController{
    renderTemplateMenuCustomer(request, response){
        response.render("menuCusmtomer", {
            user: request.session.user
        });
        return;
    }
}

export default new IndexController();
