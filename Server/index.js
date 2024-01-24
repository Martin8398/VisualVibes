import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from "cors"
import multer from "multer";
import path from "path";
import morgan from "morgan";
import helmet from "helmet";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRputes from "./routes/users.js"
import { register } from "./controllers/auth.js";

// Configs

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginEmbedderPolicy({ policy: "cross-origin" }))
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("./assets", express.static(path.join(__dirname, 'public/assets'))); // this can be change to s3 or similar cloud storage

//  File storage

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage });

// Routes with files

app.post("/auth/register", upload.single("picture"), register);

// Routes

app.use("./auth", authRoutes);
app.use("./users", userRoutes);
app.use("./post", postRoutes);

// Mongoose config

const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT ${PORT}`))
}).catch((error) => console.log(`conection error: ${error}`));

