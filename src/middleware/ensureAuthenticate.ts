import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub : string;
}

export function ensureAuthenticate(request: Request, response: Response, next: NextFunction) {

    const authToken = request.headers.authorization;

    if(!authToken) {
        return response.status(401).end();
    }

    const [, token] = authToken.split(" ");

    try {
        const { sub } = verify(token, "ad93760cf74b5b99e52b897a561c2194") as IPayload;

        request.user_id = sub;

        return next();
    } catch(err) {
        return response.status(401).end();
    }

}