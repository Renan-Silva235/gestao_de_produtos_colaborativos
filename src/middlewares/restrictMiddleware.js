const allowedIps = process.env.ALLOWED_IPS.split(",");

export const ipsFilter = (request, response, next) => {
    const clientIp = request.ip;
    if(!allowedIps.includes(clientIp)){
        return response.status(403).render("403");
    }
    next();
}
