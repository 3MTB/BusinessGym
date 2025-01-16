import {Routes} from '@angular/router';
import {RutasRouting} from 'Constants/ConstantRutas';


const routeAdmin: Routes = [

  {
    path: RutasRouting.RouteClientes,
    loadComponent: () => import('./clientes/clientes.component').then(c => c.ClientesComponent)
  },
  {
    path: RutasRouting.RouteReportes,
    loadComponent: () => import('./reportes/reportes.component').then(c => c.ReportesComponent)
  },
  {
    path: '',
    loadComponent: () => import('./index/index.component').then(x => x.IndexComponent)
  }
]
export default routeAdmin;
