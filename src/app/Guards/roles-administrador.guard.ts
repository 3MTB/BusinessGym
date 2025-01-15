import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthPaths, RutasPaginas} from 'Constants/ConstantRutas';
import {AuthService} from '../auth/data-access/auth.service';


// export  const  rolesAdministradorGuard(rolesPermitidos : string[]): CanActivateFn = (route, state) => {
export function rolesGuard(rolesPermitidos: string[]): CanActivateFn {
  return (route, state): boolean => {
    const authService = inject(AuthService);
    const router = inject(Router);
    let role = "";
    let seguir = false;

    authService.userRole$.subscribe(userRole => {
      role = userRole ?? '';
    })
    if (route.routeConfig?.path === "auth" && role !== "") {
      return false;
    } else if (route.routeConfig?.path === "auth" && role === "") {
      return true;
    }


    seguir = rolesPermitidos.includes(role);
    if (!seguir) {
      router.navigate([RutasPaginas.AccesoDenegado]).then(x => false);
    }
    return seguir;
  }
};
