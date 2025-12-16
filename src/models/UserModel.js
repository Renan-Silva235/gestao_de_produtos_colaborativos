import validator from "validator"
import { validate } from "gerador-validador-cpf";

export default class UserModel{
    #name;
    #age;
    #birthData;
    #email;
    #password;
    #cpf;

    constructor(name, age, birthData, cpf, email, password){
        this.name = name;
        this.age = age;
        this.birthData = birthData;
        this.cpf = cpf;
        this.email = email;
        this.password = password;
    }

    get name(){
        return this.#name;
    }

    set name(newName){
        if(typeof newName !== "string"){
            throw new Error("O nome precisa ser um texto.");
        }
        else if(!/^\p{L}+( \p{L}+)*$/u.test(newName)){
            throw new Error("O campo nome só deve conter letras.");
        }

        this.#name = newName;
    }

    get age(){
        return this.#age;
    }

    set age(newAge){
        if(typeof newAge !== "number"){
            throw new Error("Campo idade inválido");
        }

        this.#age = newAge;
    }

    get birthData(){
        return this.#birthData;
    }

    set birthData(newBirthData){
        const dateNow = new Date();
        const dateToCheck = new Date(newBirthData);

        if(!/^\d{2}\/\d{2}\/\d{4}$/.test(newBirthData)){
            throw new Error("campo Data de Nascimento inválido.");
        }
        else if(dateToCheck.getTime() >= dateNow.getTime()){
            throw new Error("Data de Nascimento inválida.");
        }

        this.#convertDateAndValidate(newBirthData);

        this.#birthData = newBirthData;
    }

    get cpf(){
        return this.#cpf;
    }

    set cpf(newCpf){
        if(!validate(newCpf)){
            throw new Error("CPF INVÁLIDO");
        }

        this.#cpf = newCpf;
    }

    get email(){
        return this.#email;
    }

    set email(newEmail){
        if(!validator.isEmail(newEmail)){
            throw new Error("E-mail inválido");
        }

        this.#email = newEmail;
    }

    get password(){
        return this.#password;
    }

    set password(newPassword){
        if(typeof newPassword !== "string"){
            throw new Error("Senha precisa ser uma string");
        }
        else if(!/^\d{4}$/.test(newPassword)){
            throw new Error("Senha deve conter 4 dígitos numéricos")
        }

        this.#password = newPassword;
    }

    #convertDateAndValidate(date){
        const [day, month, year] = date.split("/").map(Number);
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
