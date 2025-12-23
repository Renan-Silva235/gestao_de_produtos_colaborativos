import "dotenv/config";
import express from "express";
import router from "../router.js";
import path from "path";
import { fileURLToPath } from "url";
import GlobalMiddleware from "../src/middlewares/GlobalMiddleware.js";
import helmet from "helmet";
import csrf from "csurf";
import session from "express-session";
import flashMessage from "connect-flash";
import store from "connect-sqlite3";
import cookieParser from "cookie-parser";

const SQLiteStore = store(session);
const app = express();
const port = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



class Server{

    configSession(){
        return session({
            store: new SQLiteStore({
                db: process.env.DATABASE_TEST,
                dir:"./database",
                table: "sessions",
            }),
            secret: process.env.SECRET,
            resave: false,
            saveUninitialized: false,
            cookie:{
                maxAge: 1000*60*60*24,
                httpOnly: true,
            }
        });
    }

    setup(){
        app.set("views", path.resolve(__dirname, "../src/views"));
        app.set("view engine", "ejs");
        app.set('trust proxy', true);

        app.use(helmet());
        app.use(express.urlencoded({ extended:true}));
        app.use(cookieParser(process.env.SECRET));
        app.use(this.configSession());
        app.use(express.json());
        app.use(flashMessage());
        app.use(express.static(path.resolve(__dirname, "..", "public")));
        app.use(csrf());
        app.use(GlobalMiddleware.checkCsrfError);
        app.use(GlobalMiddleware.csrfMiddleware);
        app.use(GlobalMiddleware.injectTemplateData);
        app.use(router);
    }

    runServer(){
        this.setup();
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`)
        });
    }

}

export default new Server();
