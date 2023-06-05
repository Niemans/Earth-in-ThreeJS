import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { Flight } from 'src/app/models/Flight';
import { Place } from 'src/app/models/Place';
import { PlaceService } from 'src/app/services/admin/place.service';

@Component({
  selector: 'app-flight-create',
  templateUrl: './flight-create.component.html',
  styleUrls: ['./flight-create.component.css']
})
export class FlightCreateComponent implements OnInit{
  @Output() flightCreated = new EventEmitter<Flight>();
  @ViewChild("formDirective") formDirective!: NgForm;

  form!: FormGroup;
  cities!: Observable<Place[]>;

  constructor(private pService: PlaceService) {}


  ngOnInit():void {
    this.form = this.createFormGroup();
    this.cities = this.pService.getPlaces();
  }

  createFlight(){
    let flight = {
      sPID: this.form.value.SC.PID,
      fPID: this.form.value.FC.PID,
      time: this.form.value.Time,
    } as Partial<Flight>;

    this.flightCreated.emit(flight as Flight);
    this.form.reset();
    this.formDirective.reset();
  }

  private createFormGroup(): FormGroup<any> {
    return new FormGroup({
      SC: new FormControl('',[Validators.required]),
      FC: new FormControl('',[Validators.required]),
      Time: new FormControl('',[Validators.required, Validators.min(1)]),
    })
  }
}
