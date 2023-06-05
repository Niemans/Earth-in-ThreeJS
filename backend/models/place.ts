import { ResultSetHeader, RowDataPacket } from 'mysql2';
import {pool as db} from '../util/database';
import * as queries from './queries/placeQueries'

export class Place{
    PID: number;
    name: string;
    latitude: string;
    longitude: string;

    constructor(name:string, latitude:string, longitude:string){
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.PID = -1;
    }

    static async placeExists(name:string){
        let [exists] = await db.execute(queries.PlaceExists, [name]) as RowDataPacket[];
        return exists[0].Exists;
    }

    static async getAllPlaces(){
        return await db.execute(queries.getAllPlaces);
    }
    
    static async getPlace(PID: number){
        return await db.execute(queries.getPlaceByID, [PID])  as RowDataPacket[];
    }
    
    static async savePlace(place: Place){
        return await db.execute(queries.InsertPlace, [place.name, place.latitude, place.longitude]) as unknown as [ResultSetHeader];
    }

    static async deletePlace(PID: number){
        return await db.execute(queries.deletePlace, [PID]) as unknown as [ResultSetHeader];
    }
}