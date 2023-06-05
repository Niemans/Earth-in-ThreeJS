import * as THREE from 'three'

export class City{
    static r: number;

    id: number;
    city: string;

    DMS_Lat: string;
    DMS_Long: string;

    private latitude:number;
    private longitude:number;

    private x:number;
    private y:number;
    private z:number;

    constructor (id:number, name:string, Latitude:string, Longitude:string){
        City.r = 5;
        this.id = id;
        this.city = name;
        this.DMS_Lat = Latitude;
        this.DMS_Long = Longitude;

        this.latitude = this.ParseDMS(this.DMS_Lat);
        this.longitude = this.ParseDMS(this.DMS_Long);

        let lapi = this.latitude  * Math.PI / 180.0;
        let lopi = this.longitude * Math.PI / 180.0;


        this.x = City.r * Math.cos(lapi) * Math.cos(lopi)
        this.y = City.r * Math.sin(lapi)
        this.z = -City.r * Math.cos(lapi) * Math.sin(lopi)
    }

    AddPlace(){
        //todo
    }


    private ParseDMS(DMSInput:string) {
        let parts = DMSInput.split(/[^\d\w]+/);

        return this.convertDMStoDD(parts[0], parts[1], parts[2], parts[3], parts[4]);
    }

    private convertDMStoDD(degrees:string, minutes:string, seconds:string, Has:string, direction:string) {
        let dd:number = Number(degrees) + Number(minutes)/60 + Number(seconds + '.' + Has)/(60*60);
        if (direction == "S" || direction == "W") {
            dd = dd * -1;
        } // Don't do anything for N or E
        return dd;
    }


    public get Position() : THREE.Vector3 {
        return new THREE.Vector3(this.x,this.y,this.z);
    }
}
