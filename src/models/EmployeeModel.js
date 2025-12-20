import UserModel  from "./UserModel.js";
import ProfileModel from "./ProfilesModel.js";

export default class EmployeeModel extends UserModel{
    #role;

    constructor(name, age, birthData, cpf, email, password, role){
        super(name, age, birthData, cpf, email, password);
        this.setRole = role;
    }

    get getRole(){
        return this.#role;
    }

    set setRole(newRole){
        if(!ProfileModel.profiles.includes(newRole)){
            throw new Error("cargo inválido.");
        }

        this.#role = newRole;
    }
}
