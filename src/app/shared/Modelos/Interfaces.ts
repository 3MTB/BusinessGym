export   interface Membresia {
  id: number
  created_at: string
  Nombre: string
  Descripcion: string
  DuracionMeses: number
  Precio: number
  Activa: boolean
  publicoObjectivo: string
}

export interface Cliente {
  id: number
  created_at: string
  Nombre: string
  Apellido: string
  Telefono: string
  UserId: string
  Direccion : string
}

export interface Subscripcion {
  id: number
  created_at: string
  ClienteId: number
  MembresiaId: number
  Inicia: string
  Finaliza: string
  Estatus: string
  Renovante: boolean
  Membresias: Membresia
}

