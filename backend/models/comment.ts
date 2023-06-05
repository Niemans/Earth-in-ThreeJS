import { pool as db } from '../util/database';
import { User } from './user';
import * as queries from "./queries/commentQueries"
import { Place } from './place';
import { Flight } from './flight';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export class Comment {
    
    CID: number;
    title: string;
    content: string;
    time: Date;
    UID: number;
    FID: number|null;
    PID: number|null;

    constructor(title:string, content:string, user:number, flight:number|null = null, place:number|null = null, CID:number = -1, time:Date = new Date()){
        this.title = title;
        this.content = content;
        this.time = time;
        this.UID = user;
        this.FID = flight;
        this.PID = place;
        this.CID = CID;
    }

    static async getAllComments(){
        return await db.execute(queries.GetAllComments);
    }

    static async getComment(CIT:number){
        return await db.execute(queries.GetComment, [CIT]) as RowDataPacket[];
    }

    static async getUserComments(UID:Number) {
        return await db.execute(queries.GetUserComments, [UID]) as RowDataPacket[];
    }

    static async getFlightComments(FID:Number) {
        return await db.execute(queries.GetFlightComments, [FID]) as RowDataPacket[];
    }

    static async getPlaceComments(PID:Number) {
        return await db.execute(queries.GetPlaceComments, [PID]) as RowDataPacket[];
    }


    static async updateComment(comment:Comment){
        return await db.execute(queries.updateComment, [comment.title, comment.content, comment.CID]) as unknown as [ResultSetHeader];
    }

    static async saveComment(comment:Comment) {
        return await db.execute(queries.InsertComment, [comment.UID, comment.FID, comment.PID, comment.title, comment.content]) as unknown as [ResultSetHeader];
    }

    static async deleteComment(CID:Number) {
        return await db.execute(queries.DeleteComment, [CID]) as unknown as [ResultSetHeader];
    }
}