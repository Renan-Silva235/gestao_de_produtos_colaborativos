const loginRequired = (request, response, next) => {
    if(!request.session.user){
        request.flash("error", "Você precisa fazer login")
        req.session.save(() => response.redirect("/login"));
        return;
    };
    next();
};

export default loginRequired;
