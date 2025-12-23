import BodyModel from "./BodyModel.js";
import EmployeeModel from "./EmployeeModel.js";
import CustomerModel from "./CustomerModel.js";
import UserRepository from "../repositories/UserRepository.js";
import bcryptjs from "bcryptjs";
import DonorModel from "./DonorModel.js";

export default class RegisterUserModel{
    constructor(body){
        this.body = new BodyModel(body);
        this.user = null;
    }

    async registerEmployee(){
        const employee = new EmployeeModel(this.body.data.name,
                                            this.body.data.age,
                                            this.body.data.birthData,
                                            this.body.data.cpf,
                                            this.body.data.email,
                                            this.body.data.role);



        if(await UserRepository.findOneBy("Employees", "Cpf", this.body.data.cpf)){
            throw new Error("foi encontrado um Doador cadastrado com esse cpf");
        }

        await UserRepository.createEmployee(employee);
        this.user = {
            email: employee.getEmail,
            password: this.#hashPassword(this.body.data.password),
            Level: "Employee"
        }
        await UserRepository.createUser(this.user);
        return;

    }

    async registerCustomer(id_responsible){
        const customer = new CustomerModel(
                                        this.body.data.name,
                                        this.body.data.age,
                                        this.body.data.birthData,
                                        this.body.data.cpf,
                                        this.body.data.email,
                                        this.body.data.address,
                                        this.body.data.city,
                                        this.body.data.state);



        if(await UserRepository.findOneBy("Customers", "Cpf", this.body.data.cpf)){
            throw new Error("foi encontrado um Doador cadastrado com esse cpf");
        }

        await UserRepository.createCustomer(customer, id_responsible);
        this.user = {
            email: customer.getEmail,
            password: this.#hashPassword(this.body.data.password),
            level: "Customer"
        }
        await UserRepository.createUser(this.user);

    }

    async registerDonor(id_responsible){
        const donor = new DonorModel(this.body.data.name,
                                    this.body.data.age,
                                    this.body.data.birthData,
                                    this.body.data.cpf,
                                    this.body.data.email);

        if(await UserRepository.findOneBy("Donors", "Cpf", this.body.data.cpf)){
            throw new Error("foi encontrado um Doador cadastrado com esse cpf");
        }
        await UserRepository.createDonor(donor, id_responsible);
        return;
    }

    #hashPassword(password){
        this.#validPassword(password);
        const salt = bcryptjs.genSaltSync();
        return bcryptjs.hashSync(password, salt);
    }


    #validPassword(password){
        if(typeof password !== "string"){
            throw new Error("Senha precisa ser uma string");
        }

        if(!/^\d{4}$/.test(password)){
            throw new Error("Senha deve conter 4 dígitos numéricos")
        }
    }
}
