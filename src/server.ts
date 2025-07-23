import express from "express";
import productoRouter from "./routes/producto.route";
import errorHandler from "./core/middlewares/error.handler.middleware";
import accountRouter from "./routes/account.route";
import cookieParser from "cookie-parser";
import { PORT } from "./core/configs/config";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/", accountRouter);
app.use("/productos", productoRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
