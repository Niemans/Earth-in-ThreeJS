import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-admin-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class AdminNavigationComponent{
  @Output() newValueEvent = new EventEmitter<number>();

  setComponentNumber(i:number){
    this.newValueEvent.emit(i);
  }

}
