import {Routes} from '@angular/router';


const routeCliente: Routes = [

  {
    path: '',
    loadComponent: () => import('./index/index.component').then(x => x.IndexComponent)
  }
]
export default routeCliente;
