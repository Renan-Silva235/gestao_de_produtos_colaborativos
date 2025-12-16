import express from "express";
import router from "../router.js";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const port = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



class ServerToTestsConfiguration{

    setup(){
        app.set("views", path.resolve(__dirname, "../src/views"));
        app.set("view engine", "ejs");

        app.use(express.static(path.resolve(__dirname, "..", "public")));
        app.use(router);
    }

    runServer(){
        this.setup();
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}/tests`)
        });
    }
}

export default new ServerToTestsConfiguration();
