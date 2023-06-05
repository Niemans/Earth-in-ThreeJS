import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private authService: AuthService){
  }

  ngOnInit():void {
    this.loginForm = this.createFormGroup();
  }


  login(){
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
    .subscribe((msg) => console.log("po zalogowaniu: ", msg));
  }


  private createFormGroup(): FormGroup<any> {
    return new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email, Validators.maxLength(50)]),
      password: new FormControl("", [Validators.required, Validators.minLength(15), Validators.maxLength(50)]),
    })
  }
}
