import { Request, Response } from "express"; 
import { CreateComplimentsService } from "../Services/CreateComplimentsService";

class CreateComplimentsController {

    async handle(request: Request, response: Response) {
        const{ tag_id, user_receiver, message } = request.body;
        const { user_id } = request;

        const createComplimentsService = new CreateComplimentsService();

        const compliments = await createComplimentsService.execute({tag_id,
            user_sender: user_id,
            user_receiver,
            message});
        
        return response.json(compliments);

    }
}

export { CreateComplimentsController };