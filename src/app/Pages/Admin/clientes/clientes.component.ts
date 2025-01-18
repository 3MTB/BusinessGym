import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {SupabaseServicio} from 'Servicios/SupabaseServicio';
import {Cliente, Membresia, Subscripcion} from 'Interfaces/Interfaces';
import {UnsubscriptionError} from 'rxjs';

@Component({
  selector: 'app-clientes',
  imports: [],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit {
  Clientes: Cliente[] = [];
  Subscripciones: Subscripcion[] = [];
  ClienteSeleccionado: Cliente | null = null;

  constructor(private supabaseServ: SupabaseServicio) {
  }

  async ngOnInit() {
    await this.CargarClientes();
  }

  async CargarClientes() {
    const result = await this.supabaseServ.ObtenerClientes() ?? [];
    if (result.error === null) {
      this.Clientes = result.Clientes ?? [];
    }
  }

  async MostrarSubscripciones(cliente: Cliente) {

    if (cliente.id === this.ClienteSeleccionado?.id) {
      this.ClienteSeleccionado = null;
      this.Subscripciones = [];
      return;
    }
    this.ClienteSeleccionado = cliente;
    const result = await this.supabaseServ.ObtenerSubscripcionesCliente(cliente.id.toString());
    if (result.error === null) {
      this.Subscripciones = result.Subscripciones ?? [];
    }
  }
}
