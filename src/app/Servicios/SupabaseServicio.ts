import {Injectable} from '@angular/core';
import {createClient, SupabaseClient} from '@supabase/supabase-js';
import {environment} from '../../environments/environment';
import {Cliente, Membresia, Subscripcion} from 'Interfaces/Interfaces';


@Injectable({providedIn: 'root'})
export class SupabaseServicio {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.SUPABASE_URL, environment.SUPABASE_APIKEY);
  }


  async ObtenerMembresias() {
    // contorlar que solo se muestren las activas en caso de ser un cliente.
    let {data: membresias, error} = await this.supabase
      .from('Membresias')
      .select('*') as { data: Membresia[] | null, error: any };
    console.log(membresias);
    return {membresias, error};
  }

  async ObtenerClientes() {
    let {data: Clientes, error} = await this.supabase
      .from('Clientes')
      .select('*') as { data: Cliente[] | null, error: any };
    return {Clientes, error}
  }

  async ObtenerSubscripcionesCliente(id: string) {

    let {data: Subscripciones, error} = await this.supabase
      .from('Subscripciones')
      .select('*, Membresias (*)')
      .eq("ClienteId", id) as { data: Subscripcion[] | null, error: any };
    console.log(Subscripciones)
    return {Subscripciones, error};
  }
}
