import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from 'src/app/models/Flight';

import { Place } from 'src/app/models/Place';
import { User } from 'src/app/models/User';
import { FlightService } from 'src/app/services/admin/flight.service';

import { PlaceService } from 'src/app/services/admin/place.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-admin-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class AdminFlightsComponent implements OnInit {
  flightsList!: Observable<Flight[]>;
  placesList!: Observable<Place[]>;

  constructor(private service: FlightService, private placeService: PlaceService, private authService: AuthService) {}

  ngOnInit(): void {
    this.flightsList = this.getFlights();
    this.placesList = this.placeService.getPlaces();
  }

  getFlights(){
    return this.service.getFlights();
  }

  createFlight(item:Flight){
    this.service.createFlight(item)
      .subscribe(()=> this.flightsList = this.getFlights());
  }

  updateFlight(record:Flight, value:string){

    record.time = Number(value);

    this.service.updateFlight(record)
      .subscribe(()=> this.flightsList = this.getFlights());
  }

  deleteFlight(record:Flight){
    this.service.deleteFlight(record.FID)
      .subscribe(p => this.flightsList = this.getFlights());
  }

}
