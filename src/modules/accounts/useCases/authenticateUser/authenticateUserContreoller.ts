import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./authenticateUserUseCase";

class authenticateUserController{

    async handle(req: Request, res: Response): Promise<Response>{

        const { email, password } = req.body;

        const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

        const token = await authenticateUserUseCase.execute({email, password});

        return res.json({token});

    }
}

export { authenticateUserController }