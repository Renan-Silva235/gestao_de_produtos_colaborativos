import validator from "validator"
import { validate } from "gerador-validador-cpf";

export default class UserModel{
    #name;
    #age;
    #birthData;
    #email;
    #cpf;

    constructor(name, age, birthData, cpf, email, password){
        this.setName = name;
        this.setAge = age;
        this.setBirthData = birthData;
        this.setCpf = cpf;
        this.setEmail = email;
    }

    get getName(){
        return this.#name;
    }

    set setName(newName){
        if(typeof newName !== "string"){
            throw new Error("O nome precisa ser um texto.");
        }
        else if(!/^\p{L}+( \p{L}+)*$/u.test(newName)){
            throw new Error("O campo nome só deve conter letras.");
        }

        this.#name = newName;
    }

    get getAge(){
        return this.#age;
    }

    set setAge(newAge){
        if(typeof newAge === ""){
            throw new Error("Campo idade inválido");
        }

        this.#age = Number(newAge);
    }

    get getBirthData(){
        return this.#birthData;
    }

    set setBirthData(newBirthData){
        if(!/^\d{4}-\d{2}-\d{2}$/.test(newBirthData)){
            throw new Error("campo Data de Nascimento inválido.");
        }

        this.#convertDateAndValidate(newBirthData);

        const [year, month, day] = newBirthData.split("-");
        this.#birthData = `${day}/${month}/${year}`;
    }

    get getCpf(){
        return this.#cpf;
    }

    set setCpf(newCpf){
        if(!validate(newCpf)){
            throw new Error("CPF INVÁLIDO");
        }

        this.#cpf = newCpf;
    }

    get getEmail(){
        return this.#email;
    }

    set setEmail(newEmail){
        if(!validator.isEmail(newEmail)){
            throw new Error("E-mail inválido");
        }

        this.#email = newEmail;
    }


    #convertDateAndValidate(date){
        const [year, month, day] = date.split("-").map(Number);
        const dateToCheck = new Date(year, month - 1, day);
        const dateNow = new Date();

        if (
            dateToCheck.getFullYear() !== year ||
            dateToCheck.getMonth() !== month - 1 ||
            dateToCheck.getDate() !== day
        ) {
            throw new Error("Data de Nascimento inválida.");
        }

        if(dateToCheck >= dateNow){
            throw new Error("Data de Nascimento inválida.");
        }
    }

}
