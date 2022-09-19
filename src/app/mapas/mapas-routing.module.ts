import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullScreenComponent } from './pages/full-screen/full-screen.component';
import { ZoomRangeComponent } from './pages/zoom-range/zoom-range.component';
import { PropiedadesComponent } from './pages/propiedades/propiedades.component';
import { MarcadoresComponent } from './pages/marcadores/marcadores.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {path:'fullscreem',component:FullScreenComponent},
      {path:'zoom-range',component:ZoomRangeComponent},
      {path:'marcadores',component:MarcadoresComponent},
      {path:'propiedades',component:PropiedadesComponent},
      {path:'**',redirectTo:'fullscreem'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapasRoutingModule { }
