class GlobalMiddleware{

    injectTemplateData(request, response, next){
        response.locals.errors = request.flash("errors");
        response.locals.success = request.flash("success");
        response.locals.user = request.session.user;
        next();
    }

    checkCsrfError(error, request, response, next){
        if(error.code === "EBADCSRFTOKEN"){
            response.status(403).render("403");
        }else{
            next();
        }

    }

    csrfMiddleware(request, response, next){
        response.locals.csrfToken = request.csrfToken();
        next();
    }
}


export default new GlobalMiddleware();
