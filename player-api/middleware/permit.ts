import {RequestWithUser} from "./auth";
import {NextFunction, Response} from "express";

const permit = (...roles: string[]) => {
    return async (req: RequestWithUser, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).send({error: 'Not authenticated!0'})
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).send({error: 'Not Authorized!'})
        }
        return next();
    }

};
export default permit;