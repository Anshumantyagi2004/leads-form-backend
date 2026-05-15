import express, { json } from "express";
import connectDB from "./config/Db.js";
import corsConfig from "./config/cors.js";
import cookieParser from "cookie-parser";
import { PORT } from "./config/env.js";
import formRoute from "./routes/formRoute.js";
import trackingRoute from "./routes/trackingRoute.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
const port = PORT;

connectDB();

// middleware
app.use(express.static("public"));
app.use(cors(corsConfig));
app.use(cookieParser());
app.use(json());


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.use("/api/form", formRoute);
app.use("/api/tracking", trackingRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
