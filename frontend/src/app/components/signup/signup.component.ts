import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import { AuthService } from 'src/app/services/auth/auth.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm!: FormGroup;

  constructor(private authService: AuthService){}

  ngOnInit():void {
    this.signupForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup<any> {
    return new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(50)]),
      email: new FormControl("", [Validators.required, Validators.email, Validators.maxLength(50)]),
      password: new FormControl("", [Validators.required, Validators.minLength(15), Validators.maxLength(50)]),
    })
  }

  signup() {
    this.authService.signup(this.signupForm.value)
      .subscribe((msg) => console.log(msg));
  }
}
