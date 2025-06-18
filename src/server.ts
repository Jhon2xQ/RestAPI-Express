import express from "express";

import productoRouter from "./routes/producto.route";
import errorHandler from "./core/middlewares/error.handler.middleware";
import userRouter from "./routes/user.route";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use("/productos", productoRouter);
app.use("/users", userRouter);

app.post("/login", (req, res) => {
  res.json({ message: "usuario logueado" });
});

app.post("/register", (req, res) => {
  res.json({ message: "usuario registrado" });
});

app.post("/logout", (req, res) => {
  res.json({ message: "sesion cerrada" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
