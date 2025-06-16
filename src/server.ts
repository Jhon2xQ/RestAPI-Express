import express from "express";

import productoRouter from "./routes/producto.route";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/productos", productoRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
