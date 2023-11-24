import { Router } from "express";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";  
import { FindByEmailController } from "../modules/accounts/useCases/findByEmail/FindByEmailController";
import { FindByIdController } from "../modules/accounts/useCases/findById/FindByIdController";
import { UpdateUserAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import uploadConfig from "../config/upload";
import multer from "multer";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const usersRoutes = Router();
const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
usersRoutes.post("/", createUserController.handle);

const findByEmailController = new FindByEmailController();
usersRoutes.get("/email", findByEmailController.handle);

const findByIdController = new FindByIdController();
usersRoutes.get("/:id", findByIdController.handle);

const updateUserAvatarController = new UpdateUserAvatarController();
usersRoutes.patch(
    "/avatar",
    ensureAuthenticated,
    uploadAvatar.single("avatar"),
    updateUserAvatarController.handle
);

export { usersRoutes }