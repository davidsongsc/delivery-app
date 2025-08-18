import { IUser } from "./IUser";

export interface ISession {
    token: string;
    user: IUser;
}