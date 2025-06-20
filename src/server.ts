import express from "express";

import productoRouter from "./routes/producto.route";
import errorHandler from "./core/middlewares/error.handler.middleware";
import accountRouter from "./routes/account.route";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use("/", accountRouter);
app.use("/productos", productoRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
