import User from "../models/User";
import { createCrudRouter } from "./crudRouterFactory";

export default createCrudRouter(User);
