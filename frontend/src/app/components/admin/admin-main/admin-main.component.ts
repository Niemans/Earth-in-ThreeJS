import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent {
  componentNumber:number = 0;

  changeComponent(cNr: number){
    this.componentNumber = cNr;
  }
}
