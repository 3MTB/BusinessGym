import {Component, OnInit} from '@angular/core';
import {SupabaseServicio} from '../../Servicios/SupabaseServicio';
import {Membresia} from 'Interfaces/Interfaces';


@Component({
  selector: 'app-membresias',
  imports: [],
  templateUrl: './membresias.component.html',
  styleUrl: './membresias.component.css'
})
export class MembresiasComponent implements OnInit {
  membresias: Membresia[] = [];

  constructor(private supabaseServ: SupabaseServicio) {
  }

  async ngOnInit() {
    const result = await this.supabaseServ.ObtenerMembresias();
    console.log(result);
    if (result.error === null) {
      this.membresias = result.membresias ?? [];
    }
  }



  ObtenerTiempoMembresia(membresia: Membresia) {

    let result = "mensual";
    if (membresia.DuracionMeses == 1) {
      result = "mensual";
    } else if (membresia.DuracionMeses == 3) {
      result = "trimestral";
    } else if (membresia.DuracionMeses == 6) {
      result = "semestral";
    } else if (membresia.DuracionMeses == 12) {
      result = "anual";
    } else {
      result = membresia.DuracionMeses + " Meses";
    }

    return result;
  }

}
