import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import inventoryRoutes from "./routes/inventory.routes.js";
import supplierRoutes from "./routes/supplier.routes.js";
import orderRoutes from "./routes/order.routes.js";

dotenv.config();
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
  origin: 'https://inventory-frontend-qgvxoh8rr-raunak-saigals-projects.vercel.app', // your GitHub Pages frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Serve the uploads folder statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());

const PORT = process.env.PORT || 5000;

connectDB();

app.use("/api/users", userRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Fallback route for React SPA
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
