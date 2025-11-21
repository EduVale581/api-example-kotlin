import express from "express";
import cors from "cors";
import userRoutes from "./routes/users.routes.js";
import { swaggerDocs } from "./swagger.js";

const app = express();

app.use(cors());
app.use(express.json());

swaggerDocs(app);

app.use("/users", userRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API running on port ${port}`));
