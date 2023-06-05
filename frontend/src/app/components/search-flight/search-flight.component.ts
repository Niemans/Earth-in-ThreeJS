import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { Place } from 'src/app/models/Place';
import { PlaceService } from 'src/app/services/admin/place.service';
import { InformationsService } from 'src/app/services/comments/informations.service';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.css']
})
export class SearchFlightComponent {
  @ViewChild("formDirective") formDirective!: NgForm;

  form!: FormGroup;
  cities!: Observable<Place[]>;

  constructor(private pService: PlaceService, private iService:InformationsService) {}


  ngOnInit():void {
    this.form = this.createFormGroup();
    this.cities = this.pService.getPlaces()
  }

  searchFlight(){
    this.iService.findComments(this.form.value.SC, this.form.value.FC);
  }

  private createFormGroup(): FormGroup<any> {
    return new FormGroup({
      SC: new FormControl('',[Validators.required]),
      FC: new FormControl('',[Validators.required]),
    })
  }
}
