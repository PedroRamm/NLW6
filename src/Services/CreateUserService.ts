import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UserRepositories";
import { hash } from "bcryptjs";

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}


class CreateUserService {
    async execute({name, email, admin = false, password}: IUserRequest) {
        const userRepository = getCustomRepository(UserRepositories);
        
        if (!email) {
            throw new Error("Not a valid email");
        }

        const userExists = await userRepository.findOne({email});
        
        if(userExists) {
            throw new Error("Email already exists in our database");
        }

        const passwordHash = await hash(password, 8);

        const user = userRepository.create({
            name,
            email,
            admin,
            password: passwordHash,
        });

        await userRepository.save(user);

        return user;
    }
}

export { CreateUserService };