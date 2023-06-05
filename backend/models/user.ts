import { ResultSetHeader, RowDataPacket } from 'mysql2';
import {pool as db} from '../util/database';
import * as queries from "./queries/userQueries"

export class User {
    
    UID: number;
    name: string;
    email: string;
    password: string;
    type: string;

    constructor(name:string, email:string, password:string){
        this.UID = -1;
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = 'user';
    }

    static makeUser(name:string, email:string, password:string, type:string, UID:number): User{
        let u = new User(name,email,password)
        u.type = type;
        u.UID = UID;
        return u;
    }

    static async getAllUsers(){
        return await db.execute(queries.getAllUsers);
    }

    static async getUser(UID: number){
        return await db.execute(queries.GetUserByID, [UID]);
    }

    static async deleteUser(UID: number){
        return await db.execute(queries.DeleteUser, [UID]) as unknown as [ResultSetHeader];
    }


    static async EmailExists(email:string){
        let [exists] = await db.execute(queries.EmailExists, [email]) as unknown as RowDataPacket[];
        return exists[0].Exists;
    }

    static async findUser(email:string){
        return await db.execute(queries.GetUserByEmail, [email]);
    }

    static async InsertUser(user:User){
        return await db.execute(queries.InsertUser, [user.name, user.email, user.password]);
    }

    static async isAdmin(UID: number){
        let [isAdmin] = await db.execute(queries.isAdmin, [UID]) as unknown as RowDataPacket[];
        return isAdmin[0].IsAdmin;
    }
}