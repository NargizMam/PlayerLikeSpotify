import { Request, Response, NextFunction } from 'express';
import { HydratedDocument } from 'mongoose';
import { UserFields } from '../types';
import User from '../models/User';

export interface RequestWithUser extends Request {
    user?: HydratedDocument<UserFields>;
}
const client = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const headerValue = req.get('Authorization');
    if (!headerValue) {
        return next();
    }
    const [_bearer, token] = headerValue.split(' ');
    if (!token) {
        return next();
    }
    const user = await User.findOne({ token });
    if (!user) {
        return next();
    }
    req.user = user;
    next();
};
export default client;
