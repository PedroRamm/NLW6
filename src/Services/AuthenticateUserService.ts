import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { UserRepositories } from "../repositories/UserRepositories";
import { sign } from "jsonwebtoken"

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {

    async execute({email, password}: IAuthenticateRequest) {
        const usersRepositories = getCustomRepository(UserRepositories);

        const user = await usersRepositories.findOne({
            email,
        });

        if(!user) {
            throw new Error("Email/Password incorrect");
        }

        const passwordMatch = await compare(password, user.password);
        
        if(!passwordMatch) {
            throw new Error("Email/Password incorrect");
        }

        const token = sign({
            email: user.email
        }, "ad93760cf74b5b99e52b897a561c2194", {
            subject: user.id,
            expiresIn: "1d"
        });

        return token;
    }
}

export { AuthenticateUserService };