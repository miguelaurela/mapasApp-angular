import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles:[`
  #mapa{
    width: 100%;
    height: 100%;
  }
  `]
})
export class FullScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // (mapboxgl as any).accessToken = environment.mapboxToken;
    //   se coloca en app component ts
    var map = new mapboxgl.Map({
    container: 'mapa',
    style: 'mapbox://styles/mapbox/streets-v11',
    center:[ -74.82717332592429,11.013945865499656],
    zoom:12
  });
  }

  
}
