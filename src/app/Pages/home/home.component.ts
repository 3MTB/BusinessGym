import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {RutasPaginas} from 'Constants/ConstantRutas';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  protected readonly RutasPaginas = RutasPaginas;
}
