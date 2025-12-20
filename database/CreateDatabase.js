import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, process.env.DATABASE_TEST)

export default class CreateDatabase{
    constructor(){
        this.db = new Database(dbPath);
        this.#createTableEmployees();
        this.#createTableCustomer();
        this.#createTableDonor();
    }

    #createTableEmployees(){
        const commandSqlToCreateTable = `CREATE TABLE IF NOT EXISTS Employees(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            Nome TEXT NOT NULL,
            Idade INTEGER NOT NULL,
            DataDeNascimento TEXT NOT NULL,
            Cpf TEXT UNIQUE NOT NULL,
            Email TEXT UNIQUE NOT NULL,
            Senha TEXT NOT NULL,
            Cargo TEXT NOT NULL
        );`;
        this.db.exec(commandSqlToCreateTable);
    }

    #createTableCustomer(){
        const commandSqlToCreateTable = `CREATE TABLE IF NOT EXISTS Customers(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_responsavel INTEGER NOT NULL,
            Nome TEXT NOT NULL,
            Idade INTEGER NOT NULL,
            DataDeNascimento TEXT NOT NULL,
            Cpf TEXT UNIQUE NOT NULL,
            Email TEXT UNIQUE NOT NULL,
            Senha TEXT NOT NULL,
            Endereco TEXT NOT NULL,
            Cidade TEXT NOT NULL,
            Estado TEXT NOT NULL,

            FOREIGN KEY (id_responsavel) REFERENCES Employees(id)
        );`;
        this.db.exec(commandSqlToCreateTable);
    }

    #createTableDonor(){
        const commandSqlToCreateTable = `CREATE TABLE IF NOT EXISTS Donors(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_responsavel INTEGER NOT NULL,
            Nome TEXT NOT NULL,
            Idade INTEGER NOT NULL,
            DataDeNascimento TEXT NOT NULL,
            Cpf TEXT UNIQUE NOT NULL,
            Email TEXT UNIQUE NOT NULL,

            FOREIGN KEY (id_responsavel) REFERENCES Employees(id)
        );`

        this.db.exec(commandSqlToCreateTable);
    }

}
