import { Body, custom, isEmail, isNumber, isString, required, union } from '../lib/decorators/decorators';
import { Request, Response } from 'express';
const users: string[] = ["soroosh", "saba", "amir", "ali"];

class User {
    @required()
    @isString()
    name: string;
    @required()
    @isNumber()
    age: number;
    @isEmail()
    email: string;
    @union("programmer", "developer", 'employee')
    job: string;
    @custom((v) => {
        return v > 3
    })
    experience;
}

class UserController {
    get_getUsers(req: Request, res: Response) {
        res.send(users)
    }
    @Body(User)
    post_postUser(req: Request, res: Response) {
        users.push(req.body);
        return res.send(users)
    }
}

export default UserController