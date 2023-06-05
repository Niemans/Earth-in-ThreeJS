import { Component, OnInit } from '@angular/core';

import { Comment as com } from 'src/app/models/Comment';

import { InformationsService } from 'src/app/services/comments/informations.service';

@Component({
  selector: 'app-place-comments',
  templateUrl: './place-comments.component.html',
  styleUrls: ['./place-comments.component.css']
})
export class PlaceCommentsComponent implements OnInit{
  commentList: com[] = [];

  constructor(private iService: InformationsService) {}

  ngOnInit(): void {
    this.iService.placeComments.subscribe(c => {
      this.commentList = c;
    });
  }
}
