import { Routes } from "@angular/router";
import  {AuthPaths} from "Constants/ConstantRutas"
const routesAuth: Routes = [
  {
    path: AuthPaths.RouteLogIn,
    loadComponent: () => import('../auth-log-in/auth-log-in.component').then(m => m.default)
  },
  {
    path: AuthPaths.RouteSignUp,
    loadComponent: () => import('../auth-sign-up/auth-sign-up.component').then(m => m.default)
  },
  {
    path:'**',
    redirectTo:  AuthPaths.RouteLogIn
  }
];

export default routesAuth ;
