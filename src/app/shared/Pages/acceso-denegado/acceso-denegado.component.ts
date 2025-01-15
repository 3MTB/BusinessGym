import { Component } from '@angular/core';
import {AuthPaths} from 'Constants/ConstantRutas';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-acceso-denegado',
  imports: [
    RouterLink
  ],
  templateUrl: './acceso-denegado.component.html',
  styleUrl: './acceso-denegado.component.css'
})
export class AccesoDenegadoComponent {

  protected readonly AuthPaths = AuthPaths;
}
