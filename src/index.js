import "dotenv/config.js";
import express from "express";
import bookRoutes from "./routes/books.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/api", bookRoutes);
app.use("*", (_, res) => res.status(404).send("PAGE NOT FOUND"));

const PORT = process.env.PORT || 8080;

const startServer = () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error.message);
    app.response.status(500).json({ error: error.message });
  }
};

startServer();
