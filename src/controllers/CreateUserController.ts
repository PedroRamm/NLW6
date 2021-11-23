import { Request, Response } from "express"
import { CreateUserService } from "../Services/CreateUserService";

class CreateUserController {
    async handle(request: Request, response: Response) {
        const { name, email, admin, password } = request.body;
        console.log(email);
        const createUserService = new CreateUserService();

        const user = await createUserService.execute({name, email, admin, password});

        return response.json(user);
    }
}

export { CreateUserController };