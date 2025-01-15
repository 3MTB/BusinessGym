import {Routes} from '@angular/router';


const routeAdmin: Routes = [

  {
    path: '',
    loadComponent: () => import('./index/index.component').then(x => x.IndexComponent)
  }
]
export default routeAdmin;
