import { HtmlParser } from '@angular/compiler';
import { Component, AfterViewInit ,ElementRef,ViewChild ,OnDestroy} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
interface Marcador{
  color:string;
  marker?:mapboxgl.Marker
  centro?:[number,number]
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles:[`
  .mapa-container{
    width: 100%;
    height: 100%;
  }
  .list-group{
    position:fixed;
    top:20px;
    right:20px;
    z-index:99
  }
  li{
    cursor:pointer;
  }
  `]
})
export class MarcadoresComponent  implements AfterViewInit {

  @ViewChild('mapa') divMap!:ElementRef
  mapa!:mapboxgl.Map;
zoomLevel:number=10;
center:[number,number]=[ -74.82717332592429,11.013945865499656]

//arreglo de marcadores
marcadores:Marcador[]=[]

  constructor() { }
  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center:this.center,
      zoom:this.zoomLevel,
      
    });

    // const markerHtml:HTMLElement=document.createElement('div')
    // markerHtml.innerHTML='Hola Mundo'
    // const marker=new mapboxgl.Marker({
    //   element:markerHtml
    // })
    const marker=new mapboxgl.Marker()
    .setLngLat(this.center).addTo(this.mapa)
    this.leerLocalStorage()
  }
  zoomCambio(valueZoom:string){
    this.mapa.zoomTo(Number(valueZoom))
  }
  agregarMarcador(){
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const nuevoMarcador=new mapboxgl.Marker({
      draggable:true,
      color
    })
    .setLngLat(this.center).addTo(this.mapa)
  
    this.marcadores.push({
      color:color,
      marker:nuevoMarcador
    })
    this.guardarMarcadoresLocalStorage()
  }


  irMarcador(valor:mapboxgl.Marker){
    const {lng,lat}=valor.getLngLat()
    this.mapa.flyTo({
      center:[lng,lat]
    })
  }

  guardarMarcadoresLocalStorage(){
    const lngLatArr:Marcador[]=[]
    this.marcadores.forEach(m=>{
      const color=m.color;
      const {lng, lat }=m.marker!.getLngLat()
      
      
      lngLatArr.push({
        color:color,
        centro:[lng,lat]
      })
    })
    localStorage.setItem('marcadores',JSON.stringify(lngLatArr))
  }


  leerLocalStorage(){
    if (!localStorage.getItem('marcadores')) {
      return;
    }
    const lngLatArr:Marcador[]=JSON.parse(localStorage.getItem('marcadores')!);
    lngLatArr.forEach(m=>{
      const newMarker=new mapboxgl.Marker({
        color:m.color,
        draggable:true
      })
      .setLngLat(m.centro!)
      .addTo(this.mapa);
      this.marcadores.push({
        marker:newMarker,
        color:m.color
      })
    })

  }
}
