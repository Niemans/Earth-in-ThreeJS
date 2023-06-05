import { Component, OnInit } from '@angular/core';

import { Comment as com } from 'src/app/models/Comment';

import { InformationsService } from 'src/app/services/comments/informations.service';

@Component({
  selector: 'app-flight-comments',
  templateUrl: './flight-comments.component.html',
  styleUrls: ['./flight-comments.component.css']
})
export class FlightCommentsComponent implements OnInit{
  commentList: com[] = [];

  constructor(private iService: InformationsService) {}

  ngOnInit(): void {
    this.iService.flightComments.subscribe(c => {
      this.commentList = c;
    });

  }
}
