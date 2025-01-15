import {Routes} from '@angular/router';
import {RutasPaginas} from 'Constants/ConstantRutas';
import {rolesGuard} from './Guards/roles-administrador.guard';
import {Roles} from 'Constants/ConstGenerales';

export const routes: Routes =
  [
    {
      path: 'auth',
      canActivate: [rolesGuard([Roles.Admin,Roles.Client])],
      loadChildren: () => import('./auth/features/auth-shell/auth-routing')
    },
    {
      path: RutasPaginas.RouteAdmin,
      canActivate: [rolesGuard([Roles.Admin])],
      loadChildren: () => import('./Pages/Admin/RoutingAdmin')
    },
    {
      path: RutasPaginas.RouteCliente,
      canActivate: [rolesGuard([Roles.Client])],
      loadChildren: () => import('./Pages/Client/RoutingCliente')
    }
    ,
    {
      path: RutasPaginas.AccesoDenegado,
      loadComponent: () => import('./shared/Pages/acceso-denegado/acceso-denegado.component').then(d => d.AccesoDenegadoComponent)
    }
  ];
