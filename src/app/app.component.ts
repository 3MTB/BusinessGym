import {Component, OnInit} from '@angular/core';
import {MenuComponent} from './shared/Pages/menu/menu.component';


@Component({
  selector: 'app-root',
  imports: [MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor() {

  }

}

