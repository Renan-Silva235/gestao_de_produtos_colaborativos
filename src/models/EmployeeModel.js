import UserModel  from "./UserModel.js";
import ProfileModel from "./ProfilesModel.js";

export default class EmployeeModel extends UserModel{
    #position;

    constructor(name, age, birthData, cpf, email, password, position){
        super(name, age, birthData, cpf, email, password);
        this.setPosition = position;
    }

    get getPosition(){
        return this.#position;
    }

    set setPosition(newPosition){
        if(!ProfileModel.profiles.includes(newPosition)){
            throw new Error("cargo inválido.");
        }

        this.#position = newPosition;
    }
}
