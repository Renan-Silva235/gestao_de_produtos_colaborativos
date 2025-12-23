import CreateDatabase from "../../database/CreateDatabase.js";

class UserRepository extends CreateDatabase{
    constructor(){
        super();
    }

    async createEmployee(data){
        const sqlInsert = `
            INSERT INTO Employees(Nome, Idade, DataDeNascimento, Cpf, Email, Cargo)
            VALUES (?, ?, ?, ?, ?,?)
        `;
        const statement = this.db.prepare(sqlInsert);

        return statement.run(data.getName,
                            data.getAge,
                            data.getBirthData,
                            data.getCpf,
                            data.getEmail,
                            data.getRole,
        )
    }

    async createCustomer(data){
        const sqlInsert = `
            INSERT INTO Customers(id_responsavel ,Nome, Idade, DataDeNascimento, Cpf, Email, Endereco, Cidade, Estado)
            VALUES(?,?,?,?,?,?,?,?,?)
        `;

        const statement = this.db.prepare(sqlInsert);

        return statement.run(id_responsible,
                            data.getName,
                            data.getAge,
                            data.getBirthData,
                            data.getCpf,
                            data.getEmail,
                            data.getAddress,
                            data.getCity,
                            data.getState)
    }

    async createDonor(data, id_responsible){
        const sqlInsert = `
            INSERT INTO Donors (id_responsavel, Nome, Idade, DataDeNascimento, Cpf, Email)
            VALUES(?,?,?,?,?,?)
        `

        const statement = this.db.prepare(sqlInsert);
        return statement.run(id_responsible,
                            data.getName,
                            data.getAge,
                            data.getBirthData,
                            data.getCpf,
                            data.getEmail)
    }

    async createUser(data){
        const sqlInsert = `
            INSERT INTO Users(Email, Senha, Level)
            VALUES (?,?,?)
        `
        const statement = this.db.prepare(sqlInsert);
        return statement.run(data.email, data.password, data.level);
    }

   async findOneBy(table, column, value) {
        const allowedTables = ["Customers", "Employees", "Donors"];
        const allowedColumns = ["Email", "Cpf", "id"];

        if (!allowedTables.includes(table) || !allowedColumns.includes(column)) {
            throw new Error("Acesso não autorizado a esses dados.");
        }

        const sqlQuery = `SELECT * FROM ${table} WHERE ${column} = ?`;
        return this.db.prepare(sqlQuery).get(value);
    }

}

export default new UserRepository();
