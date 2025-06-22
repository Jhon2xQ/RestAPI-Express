import { Container } from "inversify";
import { TYPES } from "./ioc.types";
import { UserRepository } from "../../infraestructure/persistence/user.repository";
import { AccountController } from "../../presentation/controllers/account.controller";
import UserService from "../../application/services/user.service";
import AccountService from "../../application/services/account.service";
import { ProductoRepository } from "../../infraestructure/persistence/producto.repository";
import ProductoService from "../../application/services/producto.service";
import ProductoController from "../../presentation/controllers/producto.controller";

const container = new Container();

container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<UserService>(TYPES.UserService).to(UserService);

container.bind<AccountService>(TYPES.AccountService).to(AccountService);
container.bind<AccountController>(TYPES.AccountController).to(AccountController);

container.bind<ProductoRepository>(TYPES.ProductoRepository).to(ProductoRepository);
container.bind<ProductoService>(TYPES.ProductoService).to(ProductoService);
container.bind<ProductoController>(TYPES.ProductoController).to(ProductoController);

export default container;
