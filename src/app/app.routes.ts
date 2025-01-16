import {Routes} from '@angular/router';
import {RutasPaginas, RutasRouting} from 'Constants/ConstantRutas';
import {rolesGuard} from './Guards/roles-administrador.guard';
import {Roles} from 'Constants/ConstGenerales';

export const routes: Routes =
  [
    {
      path: 'auth',
      canActivate: [rolesGuard([Roles.Admin, Roles.Client])],
      loadChildren: () => import('./auth/features/auth-shell/auth-routing')
    },
    {
      path: RutasRouting.RouteAdmin,
      canActivate: [rolesGuard([Roles.Admin])],
      loadChildren: () => import('./Pages/Admin/RoutingAdmin')
    },
    {
      path: RutasRouting.RouteCliente,
      canActivate: [rolesGuard([Roles.Client])],
      loadChildren: () => import('./Pages/Client/RoutingCliente')
    },
    {
      path: RutasRouting.RouteHome,
      loadComponent: () => import('./Pages/home/home.component').then(m => m.HomeComponent),
    },
    {
      path: RutasRouting.RouteMembresias,
      loadComponent: () => import('./Pages/membresias/membresias.component').then(m => m.MembresiasComponent),
    },
    {
      path: RutasPaginas.AccesoDenegado,
      loadComponent: () => import('./shared/Pages/acceso-denegado/acceso-denegado.component').then(d => d.AccesoDenegadoComponent)
    },
    {
      path: RutasPaginas.NoEncontrado,
      loadComponent: () => import('./shared/Pages/no-encontrado/no-encontrado.component').then(m => m.NoEncontradoComponent)
    }
  ];
