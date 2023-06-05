import { Place } from "./place";
import {pool as db} from '../util/database';
import * as queries from './queries/flightQueries';
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class Flight {
    FID: number;
    start: number;
    finish: number;
    time: number;

    constructor(start:number, finish:number, time:number, id:number = -1){
        this.FID = id;
        this.start = start;
        this.finish = finish;
        this.time = time;
    }

    static async getAllPlaces(){
        return await db.execute(queries.getAllFlights);
    }

    static async getFlightByID(FID: number){
        return await db.execute(queries.getFlightByID, [FID]) as RowDataPacket[];
    }

    static async getFlightByPlaces(start:number, finish:number){
        return await db.execute(queries.getFlightByPaces, [start, finish]) as RowDataPacket[];
    }

    static async saveFlight(flight:Flight){
        return await db.execute(queries.InsertFlight, [flight.start, flight.finish, flight.time]) as unknown as [ResultSetHeader];
    }

    static async deleteFlight(FID: number){
        return await db.execute(queries.deleteFlight, [FID]) as unknown as [ResultSetHeader];
    }

    static async updateFlight(flight: Flight){
        return await db.execute(queries.updateFlight, [flight.time, flight.FID]) as unknown as [ResultSetHeader];
    }

}