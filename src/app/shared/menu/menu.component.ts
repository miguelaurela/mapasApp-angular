import { Component } from '@angular/core';
interface ManuItem{
  ruta:string;
  nombre :string; 
}
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent  {

  constructor() { }
   menuItems:ManuItem[]=[
    {
      ruta:'/mapas/fullscreem',
      nombre:'FullScreems'
    },
    {
      ruta:'/mapas/zoom-range',
      nombre:'Zoom range'
    },
    {
      ruta:'/mapas/marcadores',
      nombre:'Marcadores'
    },
    {
      ruta:'/mapas/propiedades',
      nombre:'Propiedades'
    },
  ]

}
