import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';

import { Place } from 'src/app/models/Place';

@Component({
  selector: 'app-admin-place-create',
  templateUrl: './place-create.component.html',
  styleUrls: ['./place-create.component.scss']
})
export class PlaceCreateComponent {
  @Output() placeCreated = new EventEmitter<Place>();
  @ViewChild("formDirective") formDirective!: NgForm;

  form!: FormGroup;

  constructor() {}

  ngOnInit():void {
    this.form = this.createFormGroup();
  }

  createPlace(){
    let place = {
      name: this.form.value.name,
      latitude: this.form.value.latitude,
      longitude: this.form.value.longitude
    } as Partial<Place>;

    this.placeCreated.emit(place as Place);
    this.form.reset();
    this.formDirective.reset();
  }

  private createFormGroup(): FormGroup<any> {
    return new FormGroup({
      name: new FormControl('',[Validators.required, Validators.maxLength(50)]),
      latitude: new FormControl('',[Validators.required, Validators.pattern("^ *[1-9]?[0-9]° [1-5]?[0-9]' [1-5]?[0-9].[0-9]{4}'' [NS] *$"), Validators.maxLength(100)]),
      longitude: new FormControl('',[Validators.required, Validators.pattern("^ *[1]?[0-9]?[0-9]° [1-5]?[0-9]' [1-5]?[0-9].[0-9]{4}'' [WE] *$"), Validators.maxLength(100)]),
    })
  }
}
