import UserModel from "./UserModel.js";

export default class DonorModel extends UserModel{
    constructor(name, age, birthData, cpf, email){
        super(name, age, birthData, cpf, email);
    }
}
