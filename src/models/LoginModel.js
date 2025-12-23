import BodyModel from "./BodyModel.js";
import userRepository from "../repositories/UserRepository.js"
import bcryptjs from "bcryptjs";

export default class LoginModel{
    constructor(body){
        this.body = new BodyModel(body);
        this.user = null;
    }

    async login(){
        const userCredentials = await userRepository.findOneBy("Users", "Email", this.body.data.email);
        if(!userCredentials){
            throw new Error("Usuário não encontrado");
        }

        const passwordMath = bcryptjs.compareSync(this.body.data.password, userCredentials.Senha);
        if(!passwordMath){
            throw new Error("Email ou Senha inválida")
        }
        this.user = userCredentials;
        return this.user
    }
}
