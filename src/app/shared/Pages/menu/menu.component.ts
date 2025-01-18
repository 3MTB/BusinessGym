import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {AuthService} from '../../../auth/data-access/auth.service';
import {AuthPaths, RutasPaginas} from 'Constants/ConstantRutas';

@Component({
  selector: 'app-menu',
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  showMenu = false;
  role: string | null = null;
  isMenuOpen = false;

  constructor(private authServicio: AuthService, private router: Router) {
  }

  async ngOnInit() {
    this.authServicio.userRole$.subscribe(role => {
      this.role = role;
      //  this.ManejadorRutas();
    })
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }


  //
  // async ManejadorRutas() {
  //   console.log('ManejadorRutas', this.role);
  //   if (this.role === RutasPaginas.Admin) {
  //     await this.router.navigate([RutasPaginas.Admin]);
  //   } else if (this.role === RutasPaginas.Cliente) {
  //     await this.router.navigate([RutasPaginas.Cliente]);
  //   } else {
  //     await this.router.navigate([AuthPaths.LogIn]);
  //   }
  //
  // }

  async btnLogin() {
    // cerrar seccion
    if (this.role !== null) {
      const result = await this.authServicio.signOut();
      if (result) {
        await this.router.navigate([AuthPaths.LogIn]);
      }
    } else {
      // redirigir al login
      await this.router.navigate([AuthPaths.LogIn]);
    }
  }

  protected readonly RutasPaginas = RutasPaginas;
}
