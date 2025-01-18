import {Component, OnInit} from '@angular/core';
import {SupabaseServicio} from '../../Servicios/SupabaseServicio';
import {Membresia} from 'Interfaces/Interfaces';
import {SupaReal} from 'Servicios/SupaReal';
import {JsonPipe} from '@angular/common';


@Component({
  selector: 'app-membresias',
  imports: [JsonPipe],
  templateUrl: './membresias.component.html',
  styleUrl: './membresias.component.css'
})
export class MembresiasComponent implements OnInit {
  membresias: Membresia[] = [];

  message : any;

  constructor(private supabaseServ: SupabaseServicio, private real: SupaReal) {
  }

  ngOnInit() {
    const supa = this.real.getSupabase();


    supa.channel('custom-all-channel')
      .on(
        'postgres_changes',
        {event: '*', schema: 'public', table: 'Clientes'},
        (payload) => {
          alert("change received")
          console.log('Change received!', payload)
          this.message = payload;

        }
      )
      .subscribe()
  }

  // async ngOnInit() {
  //   const result = await this.supabaseServ.ObtenerMembresias();
  //   console.log(result);
  //   if (result.error === null) {
  //     this.membresias = result.membresias ?? [];
  //   }
  // }


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
