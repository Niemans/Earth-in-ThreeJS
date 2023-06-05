import { Component, OnInit } from '@angular/core';
import { makePlanet } from './three/main-planet'
import { PlaceService } from 'src/app/services/admin/place.service';
import { City } from 'src/app/models/city';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit{
  cityList: City[];
  image! : string;

  constructor(private service: PlaceService){
    this.cityList = [];
  }

  async ngOnInit(): Promise<void> {
    this.service.getPlaces().subscribe(pl => {
      pl.forEach(p => {
        this.cityList.push(new City(p.PID,p.name,p.latitude,p.longitude))
      });
      makePlanet(this.cityList);
    });
  }

}
