import {City} from '../../../models/city'

export class CityConnection{
    startingCity: City;
    finishCity: City;

    constructor(c1:City, c2:City){
        this.startingCity = c1;
        this.finishCity = c2;
    }


}
