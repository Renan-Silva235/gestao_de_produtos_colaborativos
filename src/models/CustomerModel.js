import UserModel from "./UserModel.js";

export default class CustomerModel extends UserModel{
    #address;
    #city;
    #state;

    constructor(name, age, birthData, cpf, email, password, address, city, state){
        super(name, age, birthData, cpf, email, password);
        this.setAddress = address;
        this.setCity = city;
        this.setState = state;
    }

    get getAddress(){
        return this.#address;
    }

    set setAddress(newAddress){
        this.#address = newAddress;
    }

    get getCity(){
        return this.#city;
    }

    set setCity(newCity){
        this.#city = newCity;
    }

    get getState(){
        return this.#state;
    }

    set setState(newState){
        this.#state = newState;
    }
}
