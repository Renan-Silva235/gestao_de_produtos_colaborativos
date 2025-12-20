import BodyModel from "./BodyModel.js";
import EmployeeModel from "./EmployeeModel.js";
import CustomerModel from "./CustomerModel.js";
import UserRepository from "../repositories/UserRepository.js";
import bcryptjs from "bcryptjs";
import DonorModel from "./DonorModel.js";

export default class RegisterUserModel{
    constructor(body){
        this.body = new BodyModel(body)
    }

    async registerEmployee(){
        try {
            const employee = new EmployeeModel(this.body.data.name,
                                              this.body.data.age,
                                              this.body.data.birthData,
                                              this.body.data.cpf,
                                              this.body.data.email,
                                              this.body.data.password,
                                              this.body.data.role);


            employee.setPassword = this.#hashPassword(employee.getPassword);
            await UserRepository.createEmployee(employee);


        } catch (error) {
            throw new Error(error.message);
        }
    }

    async registerCustomer(id_responsible){
        try {
            const customer = new CustomerModel(
                                            this.body.data.name,
                                            this.body.data.age,
                                            this.body.data.birthData,
                                            this.body.data.cpf,
                                            this.body.data.email,
                                            this.body.data.password,
                                            this.body.data.address,
                                            this.body.data.city,
                                            this.body.data.state);



            customer.setPassword = this.#hashPassword(customer.getPassword);
            await UserRepository.createCustomer(customer, id_responsible);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async registerDonor(id_responsible){
        try {
            const donor = new DonorModel(this.body.data.name,
                                        this.body.data.age,
                                        this.body.data.birthData,
                                        this.body.data.cpf,
                                        this.body.data.email);

            await UserRepository.createDonor(donor, id_responsible);

        } catch (error) {
            throw new Error(error.message)
        }
    }


    #hashPassword(password){
        const salt = bcryptjs.genSaltSync();
        return bcryptjs.hashSync(password, salt);
    }

}
