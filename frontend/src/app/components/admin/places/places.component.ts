import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Place } from 'src/app/models/Place';
import { User } from 'src/app/models/User';

import { PlaceService } from 'src/app/services/admin/place.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-admin-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class AdminPlacesComponent implements OnInit {
  placesList!: Observable<Place[]>;

  constructor(private service: PlaceService) {}

  ngOnInit(): void {
    this.placesList = this.getPlaces();
  }

  getPlaces(){
    return this.service.getPlaces();
  }

  createPlace(item:Place){
    this.service.createPlace(item)
      .subscribe(()=> this.placesList = this.getPlaces());
  }

  deletePlace(record:Place){
    this.service.deletePlace(record.PID)
      .subscribe(p => this.placesList = this.getPlaces());
  }

}
