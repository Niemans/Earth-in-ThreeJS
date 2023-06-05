import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Flight } from 'src/app/models/Flight';
import { Place } from 'src/app/models/Place';
import { FlightService } from 'src/app/services/admin/flight.service';
import { PlaceService } from 'src/app/services/admin/place.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
}
