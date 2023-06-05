import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Flight } from 'src/app/models/Flight';
import { User } from 'src/app/models/User';
import { Comment as com } from 'src/app/models/Comment';

import { FlightService } from 'src/app/services/admin/flight.service';
import { UserService } from 'src/app/services/admin/user.service';
import { CommentService } from 'src/app/services/admin/comment.service';
import { Place } from 'src/app/models/Place';
import { PlaceService } from 'src/app/services/admin/place.service';

@Component({
  selector: 'app-admin-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class AdminCommentsComponent {
  userList!: Observable<User[]>;
  flightList!: Observable<Flight[]>;
  placeList!: Observable<Place[]>;
  commentList!: Observable<com[]>;


  constructor(private uService: UserService, private fService: FlightService, private cService: CommentService, private pService: PlaceService) {}

  ngOnInit(): void {
    this.userList = this.uService.getUsers();
    this.flightList = this.fService.getFlights();
    this.commentList = this.getComments();
    this.placeList = this.pService.getPlaces();
  }

  getComments(){
    return this.cService.getComments();
  }

  deleteCommentAdmin(record:com){
    this.cService.deleteCommentAdmin(record.CID)
      .subscribe(p => this.commentList = this.getComments());
  }


}
