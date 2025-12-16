export class UserModel{
    #name;
    #age;
    #birthData;

    constructor(name, age, birthData){
        this.name = name;
        this.age = age;
        this.birthData = birthData;
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
        if(!/^\d{2}\/\d{2}\/\d{4}$/.test(newBirthData)){
            throw new Error("campo Data de Nascimento inválido.")
        }

        this.#birthData = newBirthData;
    }

}
