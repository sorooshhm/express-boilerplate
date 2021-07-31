import { Request, Response } from 'express';
declare class UserController {
    get_getUsers(req: Request, res: Response): void;
    post_postUser(req: Request, res: Response): Response<any, Record<string, any>>;
}
export default UserController;
