import { Component, AfterViewInit ,ElementRef,ViewChild ,OnDestroy} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles:[`
  .mapa-container{
    width: 100%;
    height: 100%;
  }
  .row{
    background-color: white; 
     border-radius:5px ;
    bottom: 50px;
    left:50px;
    padding: 10px;
    position: fixed;
    z-index: 999;
    width:400px;
  }
  `]
})
export class ZoomRangeComponent implements AfterViewInit,OnDestroy {
 
 @ViewChild('mapa') divMap!:ElementRef
  mapa!:mapboxgl.Map;
zoomLevel:number=10;
center:[number,number]=[ -74.82717332592429,11.013945865499656]

  constructor() { }
  ngOnDestroy(): void {
    //regla de oro destruir los listeners al finalizar el componente
    this.mapa.off('zoom',()=>{})
    this.mapa.off('zoomend',()=>{})
    this.mapa.off('move',()=>{})
  }
  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center:this.center,
      zoom:this.zoomLevel
    });
    this.mapa.on('zoom',(ev)=>{
      this.zoomLevel=this.mapa.getZoom();
    })
    this.mapa.on('zoomend',(ev)=>{
      if (this.mapa.getZoom()>18 ) {
        this.mapa.zoomTo(18)
      }    
    })
    //moviemiento del mapa
    //listener
    this.mapa.on('move',(ev)=>{
      // this.zoomLevel=this.mapa.getZoom();
      const target=ev.target;
      const {lng,lat}=target.getCenter()
      // console.log(target);
      this.center=[lng,lat];
      
    })
  }
  zoomCambio(valueZoom:string){
    this.mapa.zoomTo(Number(valueZoom))
  }
  zoonOut(){
    this.mapa.zoomOut()
    this.zoomLevel=this.mapa.getZoom()
    // console.log(this.mapa.getZoom());
  }
  zoonIn(){
    this.mapa.zoomIn()
    this.zoomLevel=this.mapa.getZoom()
    // console.log(this.mapa.getZoom());
  }
}

  

