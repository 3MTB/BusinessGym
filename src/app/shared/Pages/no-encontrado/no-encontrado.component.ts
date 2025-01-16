import { Component } from '@angular/core';
import {RutasPaginas} from 'Constants/ConstantRutas';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-no-encontrado',
  imports: [
    RouterLink
  ],
  templateUrl: './no-encontrado.component.html',
  styleUrl: './no-encontrado.component.css'
})
export class NoEncontradoComponent {

  protected readonly RutasPaginas = RutasPaginas;
}
