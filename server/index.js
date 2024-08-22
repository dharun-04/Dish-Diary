
import express from "express"; 
import connectDB from "./mongodb/connect.js";
import bodyParser from "body-parser";
import mongoose from "mongoose"; 
import cors from "cors"; 
import * as dotenv from "dotenv"; 
import multer from "multer"; 
import helmet from "helmet"; 
import morgan from "morgan"; 
import path from "path"; 
import { fileURLToPath } from "url"; 
import authRoutes from "./routes/auth.js"; 
import userRoutes from "./routes/users.js"; 
import { register } from "./controllers/auth.js"; 
import User from "./models/User.js"; 
import SavedRecipes from "./models/SavedRecipes.js"; 
import { users,  savedRecipes} from "./data/index.js"; 


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config(); 
const app = express(); 
app.use(express.json()); 
app.use(helmet()); 
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); 
app.use(morgan("common")); 
app.use(bodyParser.json({ limit: "30mb", extended: true })); 
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); 
app.use(cors()); 
app.use("/assets", express.static(path.join(__dirname, "public/assets"))); 


/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets"); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  },
});
const upload = multer({ storage }); 


/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register); 
app.get("/", (req, res) => {
  res.send({ message: "Hello World!" }); 
});

/* ROUTES */
app.use("/auth", authRoutes); 
app.use("/users", userRoutes); 
 

const PORT = process.env.PORT || 6001; 

const startServer = async () => {
  try {
      connectDB(process.env.MONGO_URL, () => {
      console.log("MongoDB connected, starting server...");
      app.listen(PORT, () => console.log("Server started on port http:localhost:8080")
      );
    });
  } catch (error) {
      console.log(error);
  }
};
startServer();






