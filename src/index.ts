import express from "express";
import cors from "cors";
import userRoutes from "./routes/users.routes.js";
import { swaggerDocs } from "./swagger.js";

// Temporal: para verificar que las variables se cargan
console.log("SUPABASE_URL:", process.env.SUPABASE_URL);

const app = express();

app.use(cors());
app.use(express.json());

swaggerDocs(app);

app.use("/users", userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API running on port ${port}`));
